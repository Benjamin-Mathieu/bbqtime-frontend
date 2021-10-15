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
          <ion-item lines="none">
            <ion-thumbnail v-if="this.file" slot="end">
              <ion-img :src="this.img" alt="img"></ion-img>
            </ion-thumbnail>
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
      img: null,
    };
  },
  methods: {
    pickImage(selected) {
      this.file = selected.target.files[0];
      this.img = URL.createObjectURL(this.file);
    },
    addCategorie() {
      const data = {
        libelle: this.libelle,
        file: this.file,
      };
      this.$store.dispatch("postCategorie", data);
      this.libelle = "";
    },
    async closeModal() {
      await this.$store.dispatch("getCategories");
      modalController.dismiss();
    },
  },
});
</script>