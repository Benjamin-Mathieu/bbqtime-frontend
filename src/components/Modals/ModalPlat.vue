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
      @submit.prevent="addPlat()"
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
          <ion-item>
            <ion-label>Catégorie</ion-label>
            <ion-select
              ok-text="Valider"
              cancel-text="Fermer"
              @ionChange="selectedValue($event)"
              value=""
            >
              <ion-select-option
                v-for="(categorie, index) in this.$store.state.categories"
                :key="index"
                :value="categorie.id"
              >
                {{ categorie.libelle }}
              </ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item lines="none">
            <ion-thumbnail v-if="this.img !== null" slot="end">
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
        <ion-item lines="none">
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
  IonTextarea,
  IonTitle,
  IonIcon,
  IonToolbar,
  IonHeader,
  IonContent,
  IonImg,
  IonThumbnail,
  IonSelect,
  IonSelectOption,
  modalController,
} from "@ionic/vue";

export default defineComponent({
  name: "FormMenu",
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
    IonImg,
    IonThumbnail,
    IonSelect,
    IonSelectOption,
  },
  data() {
    return {
      name: "test",
      price: 25,
      description: "zezaezae",
      stock: 10,
      file: null,
      img: null,
      categorieId: "",
    };
  },
  methods: {
    selectedValue(ev) {
      this.categorieId = ev.target.value;
    },

    pickImage(selected) {
      this.file = selected.target.files[0];
      this.img = URL.createObjectURL(this.file);
    },
    addPlat() {
      const plat = {
        libelle: this.name,
        price: this.price,
        description: this.description,
        stock: this.stock,
        file: this.file,
        category_id: this.categorieId,
      };
      this.$store.dispatch("postPlat", plat);

      this.name = "";
      this.price = "";
      this.description = "";
      this.stock = "";
      modalController.dismiss();
    },

    async closeModal() {
      await this.$store.dispatch("getCategories");
      modalController.dismiss();
    },
  },
});
</script>