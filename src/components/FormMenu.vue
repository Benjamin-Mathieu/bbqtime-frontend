<template>
  <ion-header>
    <ion-toolbar>
      <ion-title><h2>Ajout plat</h2></ion-title>
      <ion-button slot="end" @click="closeModal()">
        <ion-icon name="close"></ion-icon>
      </ion-button>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <form
      @submit.prevent="addMenu()"
      method="post"
      enctype="multipart/form-data"
    >
      <ion-card>
        <ion-card-content>
          <ion-item>
            <ion-label position="floating">Nom</ion-label>
            <ion-input type="text" v-model="name" required></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Prix</ion-label>
            <ion-input
              type="number"
              v-model.number="price"
              placeholder=" €"
              required
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-textarea
              type="text"
              v-model="description"
              placeholder="Description, allergènes..."
              required
            ></ion-textarea>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Stock</ion-label>
            <ion-input
              type="number"
              v-model.number="stock"
              required
            ></ion-input>
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
          <ion-item>
            <ion-button type="submit" size="small">Ajouter</ion-button>
          </ion-item>
        </ion-card-content>
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
  IonTextarea,
  modalController,
} from "@ionic/vue";
// import popup from "../services/popup";

export default defineComponent({
  name: "FormMenu",
  components: {
    IonLabel,
    IonItem,
    IonButton,
    IonInput,
    IonCard,
    IonCardContent,
    IonTextarea,
  },
  data() {
    return {
      name: "test",
      price: 25,
      description: "zezaezae",
      stock: 10,
      file: null,
    };
  },
  methods: {
    pickImage(selected) {
      this.file = selected.target.files[0];
    },
    addMenu() {
      const plat = {
        libelle: this.name,
        price: this.price,
        photo_url: this.photo_url,
        description: this.description,
        stock: this.stock,
        file: this.file,
      };
      this.$store.dispatch("postPlat", plat);

      this.name = "";
      this.price = "";
      this.description = "";
      this.stock = "";
    },

    closeModal() {
      modalController.dismiss();
    },
  },
});
</script>