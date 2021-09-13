<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <h1>Shop</h1>
      <h1>Shop</h1>
      <ion-card v-for="plat in this.$store.state.shop" :key="plat.id">
        <ion-grid>
          <ion-row>
            <ion-col size="2">
              <ion-img alt="plat-img" :src="plat.photo_url"></ion-img>
            </ion-col>
            <ion-col size="10">
              <ion-item>
                <ion-label>
                  <b>{{ plat.libelle }}</b>
                </ion-label>
                <ion-button @click="removePlat(plat)">
                  <ion-icon :icon="trashBinOutline"></ion-icon>
                </ion-button>
              </ion-item>
              <ion-item>
                <ion-label>Quantité</ion-label>
                <ion-input type="number" :value="plat.qty"></ion-input>
              </ion-item>
              <ion-item>Total: {{ plat.qty * plat.price }} €</ion-item>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card>
      <ion-item>
        Montant total: {{ this.$store.getters.getTotalShop }} €
      </ion-item>
      <ion-button fill="solid" @click="postOrder()">Commander</ion-button>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
} from "@ionic/vue";
import { trashBinOutline } from "ionicons/icons";

export default defineComponent({
  name: "Shop",
  components: {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
  },
  setup() {
    return {
      trashBinOutline,
    };
  },
  data() {
    return {
      totalOrder: 0,
    };
  },
  methods: {
    removePlat(plat) {
      this.$store.commit("removePlatInShop", plat);
    },
    postOrder() {
      this.$store.dispatch("postOrder");
      this.$router.push("/orders");
    },
  },
});
</script>

<style scoped>
</style>