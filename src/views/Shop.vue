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
                <ion-input
                  type="number"
                  v-model="quantity"
                  :value="plat.qty"
                ></ion-input>
              </ion-item>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card>
      <ion-item> Montant total: {{ getTotal }} € </ion-item>
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
      total: 0,
    };
  },
  computed: {
    getTotal() {
      this.$store.state.shop.forEach((plat) => {
        this.total += parseInt(plat.price, 10);
      });
      return this.total;
    },
  },
  methods: {
    removePlat(plat) {
      this.$store.state.shop = this.$store.state.shop.filter(
        (x) => x.id !== plat.id
      );
    },
  },
});
</script>

<style scoped>
</style>