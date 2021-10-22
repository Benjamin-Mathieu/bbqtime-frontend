<template>
  <ion-header>
    <ion-toolbar>
      <ion-title><h2>Modifier catégorie</h2></ion-title>
      <ion-button slot="end" @click="closeModal()">
        <ion-icon name="close"></ion-icon>
      </ion-button>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <form
      @submit.prevent="updateCategorie()"
      enctype="multipart/form-data"
      method="post"
    >
      <ion-card>
        <ion-card-content>
          <ion-item>
            <ion-label position="floating">Nom de la catégorie</ion-label>
            <ion-input type="text" v-model="editLibelle" required></ion-input>
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
          <ion-button type="submit" size="small">Mettre à jour</ion-button>
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
  },

  data() {
    return {
      file: null,
      editLibelle: this.libelle,
    };
  },
  methods: {
    pickImage(selected) {
      this.file = selected.target.files[0];
    },
    updateCategorie() {
      const data = {
        id: this.id,
        libelle: this.editLibelle,
        file: this.file,
      };
      this.$store.dispatch("putCategorie", data);
      this.editLibelle = "";
    },

    async closeModal() {
      await this.$store.dispatch("getCategories");
      modalController.dismiss();
    },
  },
});
</script>