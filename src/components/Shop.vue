<template>
  <ion-menu side="end" menu-id="shop" content-id="main">
    <ion-content>
      <p v-if="this.$store.state.shop.length === 0">Votre panier est vide</p>

      <ion-card v-else v-for="menu in this.$store.state.shop" :key="menu.id">
        <ion-grid>
          <ion-row>
            <ion-col size="2">
              <ion-img alt="event-img" :src="menu.photo_url"></ion-img>
            </ion-col>
            <ion-col size="10">
              {{ menu.libelle }}
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card>
    </ion-content>
  </ion-menu>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonMenu,
  IonContent,
  menuController,
  IonCard,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
} from "@ionic/vue";
export default defineComponent({
  name: "Shop",
  components: { IonMenu, IonContent, IonCard, IonGrid, IonRow, IonCol, IonImg },
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