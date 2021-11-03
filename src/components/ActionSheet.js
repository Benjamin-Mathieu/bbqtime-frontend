import { ActionSheet, ActionSheetButtonStyle } from '@capacitor/action-sheet';
import store from "../store/store";
import showAlert from './AlertController';
import showModal from "./Modals/ModalController";

const showActions = {
  async event(id) {
    const result = await ActionSheet.showActions({
      title: 'Choisissez une option',
      options: [
        {
          title: 'Qrcode',
        },
        {
          title: 'Copier',
        },
        {
          title: 'Inviter'
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
        actions.qrcode(id);
        break;
      case 1:
        actions.duplicate(id);
        break;
      case 2:
        actions.invite(id);
        break;
      case 3:
        showAlert.validDelete(id, "Voulez-vous supprimez cet évènement", "event");
        break;
    }
  },
}

const actions = {
  async duplicate(id) {
    await store.dispatch("getEvent", id);
    store.dispatch("duplicateEvent", id);
  },

  async invite(id) {
    await store.dispatch("getEvent", id);
    showModal.invitationEvent();
  },

  async qrcode(id) {
    await store.dispatch("getEvent", id);
    showModal.qrCode();
  }
}

export default showActions;