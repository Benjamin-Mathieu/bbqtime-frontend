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
    <form
      @submit.prevent="addCategorie()"
      enctype="multipart/form-data"
      method="post"
    >
      <ion-card>
        <ion-card-header>
          <ion-card-title>
            <ion-item>
              <ion-label>Ajouter une image</ion-label>
            </ion-item>
            <input
              type="file"
              id="file"
              name="file"
              ref="file"
              v-on:change="handleFileUpload()"
            />
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
      file: "",
    };
  },
  methods: {
    addCategorie() {
      console.log(typeof this.file);
      let data = {
        libelle: this.libelle,
        file: this.file,
      };
      this.$store.dispatch("postCategorie", data);
      this.libelle = "";
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    closeModal() {
      modalController.dismiss();
    },
  },
});
</script>