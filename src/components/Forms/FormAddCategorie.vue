<template>
  <form @submit.prevent="addCategorie()" method="post">
    <ion-card>
      <ion-card-content>
        <ion-item>
          <ion-label position="floating">Nom de la catégorie</ion-label>
          <ion-input type="text" v-model="libelle" required></ion-input>
        </ion-item>
      </ion-card-content>
      <ion-item lines="none">
        <ion-button
          :disabled="disabledButton"
          type="submit"
          slot="end"
          size="small"
          >Ajouter</ion-button
        >
      </ion-item>
    </ion-card>
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
  IonCardContent,
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
  },

  data() {
    return {
      libelle: "",
      disabledButton: false,
    };
  },
  methods: {
    async addCategorie() {
      this.disabledButton = true;
      await this.$store.dispatch("postCategorie", this.libelle);
      this.disabledButton = false;
      this.libelle = "";
      modalController.dismiss();
    },
  },
});
</script>