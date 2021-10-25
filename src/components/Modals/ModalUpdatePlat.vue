<template>
  <ion-header>
    <ion-toolbar>
      <ion-title><h2>Modifier plat</h2></ion-title>
      <ion-button slot="end" @click="closeModal()">
        <ion-icon name="close"></ion-icon>
      </ion-button>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <form
      @submit.prevent="updatePlat()"
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
          <ion-item lines="none">
            <ion-thumbnail slot="end">
              <ion-img :src="img" alt="img"></ion-img>
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
              Modifier image
            </ion-button>
          </ion-item>
          <ion-item lines="none">
            <ion-button type="submit" size="small">Mettre à jour</ion-button>
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
  IonTitle,
  IonIcon,
  IonToolbar,
  IonHeader,
  IonContent,
  modalController,
} from "@ionic/vue";

export default defineComponent({
  name: "FormMenu",
  props: ["plat"],
  components: {
    IonLabel,
    IonItem,
    IonButton,
    IonInput,
    IonCard,
    IonCardContent,
    IonTitle,
    IonIcon,
    IonToolbar,
    IonHeader,
    IonContent,
    IonTextarea,
  },
  data() {
    return {
      name: this.plat.libelle,
      price: this.plat.price,
      description: this.plat.description,
      stock: this.plat.stock,
      file: null,
      img: this.plat.photo_url,
    };
  },
  methods: {
    pickImage(selected) {
      this.file = selected.target.files[0];
      this.img = URL.createObjectURL(this.file);
    },
    updatePlat() {
      const plat = {
        id: this.plat.id,
        libelle: this.name,
        price: this.price,
        description: this.description,
        stock: this.stock,
        file: this.file,
      };
      this.$store.dispatch("putPlat", plat);

      this.name = "";
      this.price = "";
      this.description = "";
      this.stock = "";
      this.img = null;
      modalController.dismiss();
    },

    closeModal() {
      modalController.dismiss();
    },
  },
});
</script>