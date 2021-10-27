<template>
  <ion-page>
    <Header></Header>
    <Sub title="Panier"></Sub>
    <ion-content v-if="this.$store.state.shop.plats.length > 0">
      <ion-card v-for="plat in this.$store.state.shop.plats" :key="plat.id">
        <div class="container">
          <div class="img-container">
            <img alt="plat-img" :src="plat.photo_url" />
          </div>
          <div class="info-plat">
            <ion-item lines="none">
              <ion-label>
                <b>{{ plat.libelle }}</b>
              </ion-label>
              <ion-button fill="clear" @click="removePlat(plat)">
                <ion-icon name="close"></ion-icon>
              </ion-button>
            </ion-item>
            <ion-item lines="none">
              <ion-label>Quantité {{ plat.qty }}</ion-label>
            </ion-item>
            <ion-item lines="none">
              <p>Total :</p>
              <b>{{ plat.qty * plat.price + "€" }}</b>
            </ion-item>
          </div>
        </div>
      </ion-card>
      <div class="total">
        <span></span>
        <p>Montant total: {{ this.$store.getters.getTotalShop }} €</p>
        <ion-button size="small" @click="postOrder()">Commander</ion-button>
      </div>
    </ion-content>
    <ion-content v-else>
      <ion-card>
        <ion-card-header> Votre panier est vide </ion-card-header>
      </ion-card>
    </ion-content>
    <Footer
      v-if="Object.keys(this.$store.state.events.eventDetails).length > 0"
      :showDetails="true"
    ></Footer>
    <Footer v-else></Footer>
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
  IonLabel,
  IonItem,
  IonButton,
} from "@ionic/vue";
import Sub from "../components/Sub.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import AlertController from "../components/AlertController";

export default defineComponent({
  name: "Shop",
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonCardHeader,
    IonIcon,
    IonLabel,
    IonItem,
    IonButton,
    Sub,
    Header,
    Footer,
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

  .img-container {
    width: 40%;
    padding: 0.5em;
    img {
      height: 100%;
      object-fit: fill;
      border-radius: 5px;
    }
  }
  .info-plat {
    width: 60%;

    b,
    p {
      color: #7a1c1e;
    }
  }
}

.total {
  position: relative;
  span {
    position: absolute;
    right: 0;
    height: 5px;
    width: 30%;
    background-color: #7a1c1e;
    float: right;
  }

  text-align: right;
  margin: 0 auto;
  width: 80%;
  font-weight: bold;
  color: #7a1c1e;
  display: flex;
  flex-direction: column;
}
</style>