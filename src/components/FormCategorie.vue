<template>
  <form @submit.prevent="addCategorie()" method="post">
    <ion-card>
      <ion-card-header>
        <ion-card-title>
          <ion-item>
            <ion-label>Ajouter une image</ion-label>
          </ion-item>
          <input type="file" />
        </ion-card-title>
      </ion-card-header>

      <ion-card-content>
        <ion-item>
          <ion-label position="floating">Nom de la catégorie</ion-label>
          <ion-input type="text" v-model="name" required></ion-input>
        </ion-item>
      </ion-card-content>
    </ion-card>
    <ion-button type="submit" size="small">Ajouter une catégorie</ion-button>
  </form>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonLabel,
  IonItem,
  IonButton,
  IonInput,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/vue";
import popup from "../services/popup";

export default defineComponent({
  name: "FormCategorie",
  components: {
    IonLabel,
    IonItem,
    IonButton,
    IonInput,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
  },
  data() {
    return {
      name: "",
    };
  },
  mounted() {},
  methods: {
    addCategorie() {
      try {
        this.$store.dispatch("postCategorie", this.name);
        popup.showPopUp("Catégorie ajouté");
      } catch (error) {
        popup.showPopUp(error);
      }
    },
  },
});
</script>