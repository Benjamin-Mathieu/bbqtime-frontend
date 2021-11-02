<template>
  <ion-header>
    <ion-toolbar>
      <ion-title><h2>Ajout plat</h2></ion-title>
      <ion-button slot="end" fill="clear" @click="closeModal()">
        <ion-icon name="close"></ion-icon>
      </ion-button>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <FormAddPlat></FormAddPlat>
  </ion-content>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonButton,
  IonTitle,
  IonIcon,
  IonToolbar,
  IonHeader,
  IonContent,
  modalController,
} from "@ionic/vue";
import FormAddPlat from "../Forms/FormAddPlat.vue";

export default defineComponent({
  name: "ModalAddPlat",
  components: {
    IonButton,
    IonTitle,
    IonIcon,
    IonToolbar,
    IonHeader,
    IonContent,
    FormAddPlat,
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

    async closeModal() {
      await this.$store.dispatch("getCategories");
      modalController.dismiss();
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