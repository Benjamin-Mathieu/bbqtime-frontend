<template>
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
            type="decimal"
            inputmode="decimal"
            maxlength="4"
            v-model="price"
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
        <ion-item>
          <ion-label>Catégorie</ion-label>
          <ion-select
            ok-text="Valider"
            cancel-text="Fermer"
            @ionChange="selectedValue($event)"
            :value="categoryId"
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
          <ion-button :disabled="disabledButton" type="submit" size="small"
            >Mettre à jour</ion-button
          >
        </ion-item>
      </ion-card-content>
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
  IonThumbnail,
  IonImg,
  IonSelect,
  IonSelectOption,
  modalController,
} from "@ionic/vue";

export default defineComponent({
  name: "FormEditPlat",
  props: ["plat"],
  components: {
    IonLabel,
    IonItem,
    IonButton,
    IonInput,
    IonCard,
    IonCardContent,
    IonThumbnail,
    IonImg,
    IonTextarea,
    IonSelect,
    IonSelectOption,
  },
  data() {
    return {
      name: this.plat.libelle,
      price: this.plat.price,
      description: this.plat.description,
      stock: this.plat.stock,
      file: null,
      img: this.plat.photo_url,
      categoryId: this.plat.category_id,
      disabledButton: false,
    };
  },
  methods: {
    selectedValue(ev) {
      this.categoryId = ev.target.value;
    },

    pickImage(selected) {
      this.file = selected.target.files[0];
      this.img = URL.createObjectURL(this.file);
    },

    // async fileUrlToFileObject() {
    //   if (this.file === null) {
    //     const response = await fetch(this.img);
    //     const data = await response.blob();
    //     const metadata = {
    //       type: "image/jpeg",
    //     };
    //     this.file = new File([data], "test.jpg", metadata);
    //   }
    // },

    async convertPriceToDecimal(price) {
      price = price.replace(",", ".");
      return parseFloat(price);
    },

    async updatePlat() {
      // await this.fileUrlToFileObject();
      this.disabledButton = true;
      let priceInDecimal;

      if(this.price.includes(",")) {
        priceInDecimal = await this.convertPriceToDecimal(this.price);
      } else {
        priceInDecimal = this.price;
      }

      const plat = {
        id: this.plat.id,
        libelle: this.name,
        price: priceInDecimal,
        description: this.description,
        stock: this.stock,
        file: this.file,
        categoryId: this.categoryId,
      };

      await this.$store.dispatch("putPlat", plat);
      this.disabledButton = false;
      modalController.dismiss();
    },
  },
});
</script>