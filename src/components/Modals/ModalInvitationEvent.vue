<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Inviter à l'évènement</ion-title>
      <ion-button fill="clear" slot="end" @click="closeModal()">
        <ion-icon name="close"></ion-icon>
      </ion-button>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <FormMail callApi="sendInvitation"></FormMail>
  </ion-content>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  modalController,
} from "@ionic/vue";
import FormMail from "../Forms/FormMail.vue";

export default defineComponent({
  name: "ModalInvitationEvent",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    FormMail,
  },

  methods: {
    closeModal() {
      modalController.dismiss();
    },
  },
});
</script>

<style lang="scss" scoped>
</style>