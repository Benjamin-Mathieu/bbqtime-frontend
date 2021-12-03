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
            type="decimal"
            inputmode="decimal"
            v-model="price"
            maxlength="4"
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
          <ion-input
            type="number"
            inputmode="numeric"
            v-model.number="stock"
            required
          ></ion-input>
        </ion-item>
        <ion-item :class="{ 'no-category-selected': noCategorySelected }">
          <ion-label>Catégorie</ion-label>
          <ion-select
            ok-text="Valider"
            cancel-text="Fermer"
            @ionChange="selectedValue($event)"
            :value="categorieId"
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
            accept=".jpeg, jpg, .png"
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
        <ion-button :disabled="disabledButton" type="submit" size="small"
          >Ajouter</ion-button
        >
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
      disabledButton: false,
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
        console.error(error);
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
        console.error(error);
      }
    },

    async convertPriceToDecimal(price) {
      price = price.replace(",", ".");
      return parseFloat(price);
    },

    async addPlat() {
      this.disabledButton = true;
      let priceInDecimal;
      const check1 = await this.checkIfUserSelectFile();
      const check2 = await this.checkIfUserSelectCategory();

      if (this.price.includes(",")) {
        priceInDecimal = await this.convertPriceToDecimal(this.price);
      } else {
        priceInDecimal = this.price;
      }

      if (check1 && check2) {
        const plat = {
          libelle: this.name,
          price: priceInDecimal,
          description: this.description,
          stock: this.stock,
          file: this.file,
          category_id: this.categorieId,
        };
        await this.$store.dispatch("postPlat", plat);
        this.disabledButton = false;

        this.name = "";
        this.price = "";
        this.description = "";
        this.stock = "";
        modalController.dismiss();
      } else {
        this.disabledButton = false;
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