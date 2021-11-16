<template>
  <form @submit.prevent="updateCategorie()" method="post">
    <ion-card>
      <ion-card-content>
        <ion-item>
          <ion-label position="floating">Nom de la catégorie</ion-label>
          <ion-input type="text" v-model="editLibelle" required></ion-input>
        </ion-item>
      </ion-card-content>
      <ion-item lines="none">
        <ion-button
          type="submit"
          slot="end"
          size="small"
          :disabled="disabledButton"
        >
          Mettre à jour
        </ion-button>
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
  name: "FormEditCategorie",
  props: ["id", "libelle"],
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
      editLibelle: this.libelle,
      disabledButton: true,
    };
  },

  watch: {
    editLibelle() {
      if (this.editLibelle !== this.libelle) {
        this.disabledButton = false;
      }
      if (this.editLibelle === this.libelle) {
        this.disabledButton = true;
      }
    },
  },

  methods: {
    async updateCategorie() {
      this.disabledButton = true;

      const data = {
        id: this.id,
        libelle: this.editLibelle,
      };

      await this.$store.dispatch("putCategorie", data);
      this.disabledButton = false;
      modalController.dismiss();
    },
  },
});
</script>