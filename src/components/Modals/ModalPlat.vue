<template>
  <ion-header>
    <ion-toolbar>
      <ion-title><h2>Ajout plat</h2></ion-title>
      <ion-button slot="end" fill="clear" @click="closeModal()">
        <ion-icon name="close"></ion-icon>
      </ion-button>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <FormAddPlat></FormAddPlat>
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
import FormAddPlat from "../Forms/FormAddPlat.vue";

export default defineComponent({
  name: "ModalAddPlat",
  components: {
    IonButton,
    IonTitle,
    IonIcon,
    IonToolbar,
    IonHeader,
    IonContent,
    FormAddPlat,
  },

  methods: {
    async closeModal() {
      await this.$store.dispatch("getCategories");
      modalController.dismiss();
    },
  },
});
</script>

<style lang="scss" scoped>
.no-file-selected,
.no-category-selected {
  --background: red;
}
</style>