<template>
  <ion-header>
    <ion-toolbar>
      <ion-title><h2>Modifier plat</h2></ion-title>
      <ion-button fill="clear" slot="end" @click="closeModal()">
        <ion-icon name="close"></ion-icon>
      </ion-button>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <FormEditPlat :plat="this.plat"></FormEditPlat>
  </ion-content>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonButton,
  IonTitle,
  IonIcon,
  IonToolbar,
  IonHeader,
  IonContent,
  modalController,
} from "@ionic/vue";
import FormEditPlat from "../Forms/FormEditPlat.vue";

export default defineComponent({
  name: "ModalUpdatePlat",
  props: ["plat"],
  components: {
    IonButton,
    IonTitle,
    IonIcon,
    IonToolbar,
    IonHeader,
    IonContent,
    FormEditPlat,
  },

  methods: {
    closeModal() {
      modalController.dismiss();
    },
  },
});
</script>