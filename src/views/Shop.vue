<template>
  <ion-page>
    <Header></Header>
    <Sub title="Panier"></Sub>
    <ion-content v-if="this.$store.state.shop.plats.length > 0">
      <ion-card v-for="plat in this.$store.state.shop.plats" :key="plat.id">
        <div class="container">
          <div class="img">
            <ion-img alt="plat-img" :src="plat.photo_url"></ion-img>
          </div>
          <div class="info-plat">
            <ion-item lines="none">
              <ion-label>
                <b>{{ plat.libelle }}</b>
              </ion-label>
              <ion-button @click="removePlat(plat)">
                <ion-icon name="close"></ion-icon>
              </ion-button>
            </ion-item>
            <ion-item lines="none">
              <ion-label>Quantité {{ plat.qty }}</ion-label>
            </ion-item>
            <ion-item lines="none">
              <b>Total :</b>
              <p>{{ plat.qty * plat.price + "€" }}</p>
            </ion-item>
          </div>
        </div>
      </ion-card>
      <div class="total">
        <p>Montant total: {{ this.$store.getters.getTotalShop }} €</p>
        <ion-button fill="solid" @click="postOrder()">Commander</ion-button>
      </div>
    </ion-content>
    <ion-content v-else>
      <ion-card>
        <ion-card-header> Votre panier est vide </ion-card-header>
      </ion-card>
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
  IonIcon,
  IonImg,
  IonLabel,
  IonItem,
  IonButton,
} from "@ionic/vue";
import Sub from "../components/Sub.vue";
import Header from "../components/Header.vue";
import AlertController from "../components/AlertController";

export default defineComponent({
  name: "Shop",
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonCardHeader,
    IonIcon,
    IonImg,
    IonLabel,
    IonItem,
    IonButton,
    Sub,
    Header,
  },
  data() {
    return {
      totalOrder: 0,
    };
  },
  methods: {
    removePlat(plat) {
      AlertController.validDelete(
        plat,
        "Confirmez-vous la suppression du plat de votre panier ?",
        "platInShop"
      );
    },
    postOrder() {
      if (this.$store.getters.getLoginStatus) {
        this.$store.dispatch("postOrder");
        this.$router.push("/orders");
      } else {
        this.$router.push("/sign-in");
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;

  .img {
    width: 35%;
    height: 100%;
  }
  .info-plat {
    width: 65%;
  }
}

.total {
  font-weight: bold;
  color: #7a1c1e;
  display: flex;
  flex-direction: column;
  text-align: center;
}
</style>