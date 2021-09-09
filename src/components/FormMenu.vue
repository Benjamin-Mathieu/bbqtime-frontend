<template>
  <form @submit.prevent="addMenu()" method="post">
    <ion-card>
      <ion-card-header>
        <ion-card-title>
          <ion-item>
            <ion-label>Ajouter une image</ion-label>
          </ion-item>
          <input type="file" />
        </ion-card-title>
      </ion-card-header>

      <ion-card-content>
        <ion-item>
          <ion-label position="floating">Nom du menu</ion-label>
          <ion-input type="text" v-model="name" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Prix</ion-label>
          <ion-input
            type="number"
            v-model="price"
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
          <ion-label position="floating">Quantité</ion-label>
          <ion-input type="number" v-model="quantity" required></ion-input>
        </ion-item>
      </ion-card-content>
      <ion-item>
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
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonTextarea,
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
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonTextarea,
  },
  data() {
    return {
      name: "test",
      price: 25,
      description: "zezaezae",
      quantity: 10,
      photo_url: "public/uploads/test.jpg",
    };
  },
  methods: {
    addMenu() {
      const plat = {
        libelle: this.name,
        price: this.price,
        photo_url: this.photo_url,
        description: this.description,
        quantity: this.quantity,
      };
      this.$store.dispatch("postPlat", plat);
    },
  },
});
</script>