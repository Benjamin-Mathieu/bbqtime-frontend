<template>
  <ion-fab horizontal="start" vertical="bottom" slot="fixed">
    <ion-fab-button>
      <ion-icon :icon="settings"></ion-icon>
    </ion-fab-button>
    <ion-fab-list side="end">
      <ion-fab-button @click="openModalQrcode()" color="primary">
        <ion-icon :icon="qrCode"></ion-icon>
      </ion-fab-button>
      <ion-fab-button @click="addAdmin()" color="primary">
        <ion-icon :icon="personAddOutline"></ion-icon>
      </ion-fab-button>
      <ion-fab-button @click="duplicateEvent()" color="primary">
        <ion-icon :icon="duplicate"></ion-icon>
      </ion-fab-button>
      <ion-fab-button @click="shareEvent()" color="primary">
        <ion-icon :icon="shareSocial"></ion-icon>
      </ion-fab-button>
      <ion-fab-button @click="sendMail()" color="primary">
        <ion-icon :icon="mail"></ion-icon>
      </ion-fab-button>
      <ion-fab-button @click="deleteEvent()" color="primary">
        <ion-icon :icon="trash"></ion-icon>
      </ion-fab-button>
    </ion-fab-list>
  </ion-fab>
</template>

<script>
import { IonFab, IonFabList, IonFabButton, IonIcon } from "@ionic/vue";
import { defineComponent } from "vue";
import {
  download,
  personAddOutline,
  settings,
  qrCode,
  shareSocial,
  duplicate,
  pencil,
  trash,
  mail,
} from "ionicons/icons";
import { Share } from "@capacitor/share";
import AlertController from "../AlertController";
import ShowModal from "../Modals/ModalController";

export default defineComponent({
  name: "EventActionsButton",
  components: {
    IonFab,
    IonFabList,
    IonFabButton,
    IonIcon,
  },
  setup() {
    return {
      download,
      personAddOutline,
      settings,
      qrCode,
      shareSocial,
      duplicate,
      pencil,
      trash,
      mail,
    };
  },

  methods: {
    addAdmin() {
      ShowModal.addAssociate();
    },

    deleteEvent() {
      AlertController.validDelete(
        this.$store.state.events.eventTmp.id,
        "Confirmez-vous la suppression ?",
        "event"
      );
    },

    duplicateEvent() {
      this.$store.dispatch(
        "duplicateEvent",
        this.$store.state.events.eventTmp.id
      );
    },

    openModalQrcode() {
      ShowModal.qrCode();
    },

    sendMail() {
      ShowModal.invitationEvent();
    },

    shareEvent() {
      const password = this.$store.state.events.eventTmp.password;
      Share.share({
        title: "Invitation à un évènement",
        text: `Je t'invite à rejoindre mon évènement sur l'application BBQ Time via le mot de passe: ${password}`,
        dialogTitle: "Partagez votre évènement",
      });
    },
  },
});
</script>

<style lang="scss" scoped>
ion-toolbar {
  --min-height: 75px;
}
</style>