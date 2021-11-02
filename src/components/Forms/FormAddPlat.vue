<template>
  <form @submit.prevent="addPlat()" method="post" enctype="multipart/form-data">
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
          <ion-label position="floating">Description (optionnel)</ion-label>
          <ion-textarea
            type="text"
            v-model="description"
            placeholder="Description, allergènes..."
          ></ion-textarea>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Stock</ion-label>
          <ion-input type="number" v-model.number="stock" required></ion-input>
        </ion-item>
        <ion-item :class="{ 'no-category-selected': noCategorySelected }">
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
        <ion-item lines="none" :class="{ 'no-file-selected': noFileSelected }">
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
  IonImg,
  IonThumbnail,
  IonSelect,
  IonSelectOption,
  modalController,
} from "@ionic/vue";

export default defineComponent({
  name: "FormAddPlat",
  components: {
    IonLabel,
    IonItem,
    IonButton,
    IonInput,
    IonCard,
    IonCardContent,
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
      noFileSelected: false,
      noCategorySelected: false,
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

    async checkIfUserSelectFile() {
      try {
        if (this.file === null) {
          this.noFileSelected = true;
          return false;
        } else {
          this.noFileSelected = false;
          return true;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async checkIfUserSelectCategory() {
      try {
        if (this.categorieId === "") {
          this.noCategorySelected = true;
          return false;
        } else {
          this.noCategorySelected = false;
          return true;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async addPlat() {
      const check1 = await this.checkIfUserSelectFile();
      const check2 = await this.checkIfUserSelectCategory();

      if (check1 && check2) {
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
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.no-file-selected,
.no-category-selected {
  --background: red;
}
</style>