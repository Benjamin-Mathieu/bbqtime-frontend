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
        actions.duplicate(id);
        break;
      case 2:
        showAlert.validDelete(id, "Voulez-vous supprimez cet évènement", "event");
        break;
    }
  },
}

const actions = {
  async duplicate(id) {
    await store.dispatch("duplicateEvent", id);
    router.push({ name: "AddEvent" });
  }
}

export default showActions;