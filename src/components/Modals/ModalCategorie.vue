<template>
  <ion-header>
    <ion-toolbar>
      <ion-title><h2>Ajout catégorie</h2></ion-title>
      <ion-button fill="clear" slot="end" @click="closeModal()">
        <ion-icon name="close"></ion-icon>
      </ion-button>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <FormAddCategorie></FormAddCategorie>
  </ion-content>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonButton,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
  modalController,
} from "@ionic/vue";
import FormAddCategorie from "../Forms/FormAddCategorie.vue";

export default defineComponent({
  name: "ModalCategorie",
  components: {
    IonButton,
    IonTitle,
    IonHeader,
    IonToolbar,
    IonContent,
    IonIcon,
    FormAddCategorie,
  },

  methods: {
    async closeModal() {
      await this.$store.dispatch("getCategories");
      modalController.dismiss();
    },
  },
});
</script>