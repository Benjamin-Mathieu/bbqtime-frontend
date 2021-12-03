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
            <ion-button
              id="remove-plat-button"
              fill="clear"
              size="small"
              @click="removePlat(plat)"
            >
              <ion-icon name="close"></ion-icon>
            </ion-button>
            <div>
              <ion-label>
                <b>{{ plat.libelle }}</b>
              </ion-label>
            </div>
            <div>
              <ion-label>Quantité: {{ plat.qty }}</ion-label>
            </div>
            <div>
              <b>Total: {{ (plat.qty * plat.price).toFixed(2) + "€" }}</b>
            </div>
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
    IonButton,
    Sub,
    Header,
    Footer,
  },

  ionViewWillEnter() {
    if (this.$store.state.shop.plats.length > 0) {
      this.$store.dispatch(
        "getEventDetails",
        this.$store.state.shop.plats[0].event_id
      );
    }
  },

  data() {
    return {
      totalOrder: 0,
    };
  },

  methods: {
    checkIfShopIsEmpty() {
      if (this.$store.getters.getNumberItemInShop === 0) {
        this.$store.commit("setEventDetails", {});
      }
    },

    async removePlat(plat) {
      await AlertController.validDelete(
        plat,
        "Confirmez-vous la suppression du plat de votre panier ?",
        "platInShop"
      );

      this.checkIfShopIsEmpty();
    },

    async postOrder() {
      if (this.$store.getters.getLoginStatus) {
        await this.$store.dispatch("postOrder");
        this.$router.push({ name: "Orders" });
      } else {
        this.$router.push({ name: "SignIn" });
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  height: 130px;

  .img-container {
    width: 40%;
    padding: 0.5em;
    img {
      height: 100%;
      width: 100%;
      object-fit: fill;
      border-radius: 5px;
    }
  }
  .info-plat {
    #remove-plat-button {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 2;
    }

    width: 60%;
    height: 100%;
    padding: 1em 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    b,
    p {
      color: #7a1c1e;
    }
  }
}

.total {
  position: relative;
  text-align: right;
  margin: 0 auto;
  width: 80%;
  font-weight: bold;
  font-size: 1.1em;
  color: #7a1c1e;
  display: flex;
  flex-direction: column;
  span {
    position: absolute;
    right: 0;
    height: 5px;
    width: 30%;
    background-color: #7a1c1e;
  }
}
</style>