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
        <ion-card-content>
          <ion-item>
            <ion-label position="floating">Nom de la catégorie</ion-label>
            <ion-input type="text" v-model="libelle" required></ion-input>
          </ion-item>
          <input
            style="display: none"
            type="file"
            name="image"
            @change="pickImage"
            ref="fileInput"
          />

          <ion-button
            size="small"
            fill="clear"
            @click="$refs.fileInput.click()"
          >
            Poster une image
          </ion-button>
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
    IonCardContent,
    IonTitle,
    IonHeader,
    IonToolbar,
    IonContent,
  },

  data() {
    return {
      libelle: "",
      file: null,
    };
  },
  methods: {
    pickImage(selected) {
      this.file = selected.target.files[0];
    },
    addCategorie() {
      const data = {
        libelle: this.libelle,
        file: this.file,
      };
      this.$store.dispatch("postCategorie", data);
      this.libelle = "";
    },
    closeModal() {
      modalController.dismiss();
    },
  },
});
</script>