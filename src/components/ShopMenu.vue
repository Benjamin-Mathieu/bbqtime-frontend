<template>
  <ion-menu side="end" menu-id="shop" content-id="main">
    <ion-content class="shop">
      <p v-if="this.$store.state.shop.length === 0">Votre panier est vide</p>

      <!-- List of Plat in Shop -->
      <ion-list v-else>
        <ion-item v-for="plat in this.$store.state.shop" :key="plat.id">
          <ion-label>{{ plat.libelle }} </ion-label>
          <ion-label>prix: {{ plat.price + "€" }} </ion-label>
          <ion-label>quantité: {{ plat.qty }} </ion-label>
        </ion-item>
        <ion-item
          >Montant total: {{ this.$store.getters.getTotalShop }}</ion-item
        >
        <router-link :to="{ name: 'Shop' }">
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
  IonButton,
} from "@ionic/vue";
export default defineComponent({
  name: "ShopMenu",
  components: { IonMenu, IonContent, IonList, IonItem, IonLabel, IonButton },
  data() {
    return {
      totalOrder: 0,
    };
  },
  methods: {
    openShop() {
      menuController.enable(true, "shop");
      menuController.open("shop");
    },
  },
});
</script>