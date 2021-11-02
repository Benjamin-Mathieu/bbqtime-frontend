<template>
  <ion-header>
    <ion-toolbar>
      <ion-title><h2>Modifier catégorie</h2></ion-title>
      <ion-button fill="clear" slot="end" @click="closeModal()">
        <ion-icon name="close"></ion-icon>
      </ion-button>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <FormEditCategorie
      :id="this.id"
      :libelle="this.libelle"
    ></FormEditCategorie>
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
import FormEditCategorie from "../Forms/FormEditCategorie.vue";

export default defineComponent({
  name: "ModalUpdateCategorie",
  props: ["id", "libelle"],
  components: {
    IonButton,
    IonTitle,
    IonHeader,
    IonToolbar,
    IonContent,
    IonIcon,
    FormEditCategorie,
  },

  methods: {
    closeModal() {
      modalController.dismiss();
    },
  },
});
</script>