<template>
  <ion-header>
    <ion-toolbar>
      <ion-title><h2>Modifier catégorie</h2></ion-title>
      <ion-button fill="clear" slot="end" @click="closeModal()">
        <ion-icon name="close"></ion-icon>
      </ion-button>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
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
  name: "FormUpdateCategorie",
  props: ["id", "libelle"],
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
    updateCategorie() {
      const data = {
        id: this.id,
        libelle: this.editLibelle,
      };
      this.$store.dispatch("putCategorie", data);
      this.editLibelle = "";
      modalController.dismiss();
    },

    closeModal() {
      modalController.dismiss();
    },
  },
});
</script>