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
    <form @submit.prevent="addCategorie()" method="post">
      <ion-card>
        <ion-card-content>
          <ion-item>
            <ion-label position="floating">Nom de la catégorie</ion-label>
            <ion-input type="text" v-model="libelle" required></ion-input>
          </ion-item>
        </ion-card-content>
        <ion-item lines="none">
          <ion-button type="submit" slot="end" size="small">Ajouter</ion-button>
        </ion-item>
      </ion-card>
    </form>
  </ion-content>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonLabel,
  IonItem,
  IonButton,
  IonInput,
  IonCard,
  IonCardContent,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonContent,
  IonIcon,
  modalController,
} from "@ionic/vue";

export default defineComponent({
  name: "FormCategorie",
  components: {
    IonLabel,
    IonItem,
    IonButton,
    IonInput,
    IonCard,
    IonCardContent,
    IonTitle,
    IonHeader,
    IonToolbar,
    IonContent,
    IonIcon,
  },

  data() {
    return {
      libelle: "",
    };
  },
  methods: {
    async addCategorie() {
      await this.$store.dispatch("postCategorie", this.libelle);
      this.libelle = "";
      modalController.dismiss();
    },

    async closeModal() {
      await this.$store.dispatch("getCategories");
      modalController.dismiss();
    },
  },
});
</script>