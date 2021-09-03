<template>
  <ion-menu side="end" menu-id="shop" content-id="main">
    <ion-content>
      <p v-if="this.$store.state.shop.length === 0">Votre panier est vide</p>

      <!-- List of Text Items -->
      <ion-list>
        <ion-item v-for="plat in this.$store.state.shop" :key="plat.id">
          <ion-label>{{ plat.libelle }} </ion-label>
          <ion-label>{{ plat.price + "€" }} </ion-label>
          <ion-label>{{ plat.qty }} </ion-label>
        </ion-item>
        <ion-item>Montant total {{ getTotal }}</ion-item>
        <router-link to="/shop">
          <ion-button size="medium">Commander</ion-button>
        </router-link>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonMenu,
  IonContent,
  menuController,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/vue";
export default defineComponent({
  name: "ShopMenu",
  components: { IonMenu, IonContent, IonList, IonItem, IonLabel },
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
    openShop() {
      menuController.enable(true, "shop");
      menuController.open("shop");
    },
  },
});
</script>

<style scoped>
</style>