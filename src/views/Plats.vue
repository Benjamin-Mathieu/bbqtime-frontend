<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <h1>Categories</h1>
      <h1>Categories</h1>

      <ion-grid>
        <ion-row>
          <ion-col
            v-for="plat in this.$store.state.eventDetails.plats"
            :key="plat.id"
            size="6"
          >
            <ion-card>
              <img :src="plat.photo_url" alt="img-plat" />
              <ion-card-header>
                <ion-card-title
                  >{{ plat.libelle }} {{ plat.price + "€" }}</ion-card-title
                >
              </ion-card-header>

              <ion-card-content>
                {{ plat.description }}
                <ion-item>
                  <ion-label position="floating">Quantité</ion-label>
                  <ion-input type="number" v-model="quantity"></ion-input>
                </ion-item>
                <ion-button
                  @click="addToShop(plat)"
                  size="small"
                  fill="outline"
                >
                  <ion-icon :icon="addCircleOutline"></ion-icon>
                </ion-button>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonInput,
  IonLabel,
  IonCardTitle,
  IonIcon,
  IonButton,
} from "@ionic/vue";
import { addCircleOutline } from "ionicons/icons";

export default defineComponent({
  name: "Categories",
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonInput,
    IonLabel,
    IonCardTitle,
    IonIcon,
    IonButton,
  },
  setup() {
    return {
      addCircleOutline,
    };
  },
  data() {
    return {
      quantity: 1,
      total: 0,
    };
  },
  mounted() {
    this.$store.dispatch("getEventDetails", this.$route.params.id);
    this.$store.state.shop = [];
  },
  methods: {
    addToShop(addedPlat) {
      // let idPlatInStore = [];
      addedPlat.qty = this.quantity;
      this.$store.commit("setShop", addedPlat);

      this.$store.state.shop = this.$store.state.shop.filter(
        (x) => x.id !== addedPlat.id
      );

      // this.$store.state.shop.forEach((plat) => {
      // let idPlat = Object.values(plat)[0];
      // idPlatInStore.push(idPlat);
      // });

      // console.log("array id des plats:", idPlatInStore);

      // // checks whether an element is even
      // const test = (element) => element == addedPlat.id;

      // if (idPlatInStore.some(test)) {
      //   console.log("déjà pré");
      // } else {
      //   console.log("ajout");
      // }
    },
  },
});
</script>

<style scoped>
</style>