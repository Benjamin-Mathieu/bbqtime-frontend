import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import router from "../router/index";
import store from "../store/store";
import showAlert from './AlertController';

const showActions = {
  async event(id) {
    const result = await ActionSheet.showActions({
      title: 'Choisissez une option',
      options: [
        {
          title: 'Gérer',
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
        router.push({ name: 'MyEventDetails', params: { id: id } });
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

  deleteEvent(id) {
    showAlert.validDelete(id, "Voulez-vous supprimez cet évènement", "event");
  },
}

export default showActions;