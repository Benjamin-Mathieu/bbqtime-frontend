import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import axios from "axios";
import httpErrorHandler from '../store/httpErrorHandler';
import popup from './ToastController';
import router from "../router/index";
import store from "../store/store";

const URL_API = "http://192.168.1.47:3000/";

const showActions = {
  async event(id) {
    const result = await ActionSheet.showActions({
      title: 'Choisissez une option',
      options: [
        {
          title: 'Détails',
        },
        {
          title: 'Copier',
        },
        {
          title: 'Supprimer',
          style: ActionSheetButtonStyle.Destructive,
        },
        {
          title: 'Fermer',
          style: ActionSheetButtonStyle.Cancel
        }
      ],
    });
    switch (result.index) {
      case 0:
        router.push({ name: 'MyEventDetails', params: { id: id } })
        break;
      case 1:
        actions.duplicateEvent(id);
        break;
      case 2:
        actions.deleteEvent(id);
        break;
    }
  },
}

const actions = {
  duplicateEvent(id) {
    store.state.events.myEvents.forEach((event) => {
      if (event.id === id) {
        let convertedDate = event.date.slice(0, -5) + "+02:00";
        const duplicate = {
          address: event.address,
          city: event.city,
          zipcode: event.zipcode,
          name: event.name,
          description: event.description,
          date: convertedDate,
          private: event.private,
        };
        store.commit("setEventTmp", duplicate);
        router.push({ name: "AddEvent" });
      }
    });
  },

  async deleteEvent(id) {
    await axios({
      method: "delete",
      url: URL_API + 'events/delete',
      data: {
        id: id
      },
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    })
      .then(res => {
        popup.success(res.data.message);
        router.push({ name: "MyEvents" });
      })
      .catch(httpErrorHandler)
  },
}

export default showActions;