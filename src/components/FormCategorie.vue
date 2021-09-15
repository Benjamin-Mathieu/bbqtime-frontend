<template>
  <ion-header>
    <ion-toolbar>
      <ion-title><h2>Ajout catégorie</h2></ion-title>
      <ion-button slot="end" @click="closeModal()">
        <ion-icon name="close"></ion-icon>
      </ion-button>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
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
            <ion-input type="text" v-model="libelle" required></ion-input>
          </ion-item>
        </ion-card-content>
        <ion-item>
          <ion-button type="submit" size="small">Ajouter</ion-button>
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
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonContent,
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
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonTitle,
    IonHeader,
    IonToolbar,
    IonContent,
  },

  data() {
    return {
      libelle: "",
    };
  },
  mounted() {
    // this.$store.dispatch("getCategories");
  },
  methods: {
    addCategorie() {
      this.$store.dispatch("postCategorie", this.libelle);
      this.libelle = "";
    },
    closeModal() {
      modalController.dismiss();
    },
  },
});
</script>