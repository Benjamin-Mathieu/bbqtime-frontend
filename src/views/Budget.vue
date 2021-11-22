<template>
  <ion-page>
    <Header></Header>
    <Sub
      :title="'Budget / ' + this.$store.state.events.myEventDetails.event.name"
    ></Sub>
    <ion-content>
      <div id="container">
        <ion-card class="commandes">
          <ion-card-header>
            <ion-card-title color="primary">Commandes</ion-card-title>
          </ion-card-header>
          <ion-card
            v-for="plat in this.$store.state.events.myEventDetails.plats"
            :key="plat.id"
          >
            <div class="plats">
              <div class="img-container">
                <img alt="plat-img" :src="plat.photo_url" />
              </div>
              <div class="info">
                <p>{{ plat.libelle }}</p>
              </div>
              <div class="price">
                <ion-badge>{{ plat.quantity }}</ion-badge>
              </div>
            </div>
          </ion-card>
        </ion-card>

        <ion-card class="budget">
          <ion-card-header>
            <ion-card-title color="primary">Budget</ion-card-title>
          </ion-card-header>
          <ion-card
            v-for="plat in this.$store.state.events.myEventDetails.plats"
            :key="plat.id"
          >
            <div class="plats">
              <div class="img-container">
                <img alt="plat-img" :src="plat.photo_url" />
              </div>
              <div class="info">
                <p>{{ plat.libelle }}</p>
                <ion-badge slot="end">{{ plat.total }} €</ion-badge>
              </div>
            </div>
          </ion-card>
          <ion-item-divider color="primary">
            <ion-label>
              Montant total:
              {{ this.$store.state.events.myEventDetails.totalBudget }} €
            </ion-label>
          </ion-item-divider>
        </ion-card>
      </div>
    </ion-content>
    <Footer></Footer>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonBadge,
  IonLabel,
  IonItemDivider,
} from "@ionic/vue";
import Sub from "../components/Sub.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default defineComponent({
  name: "Budget",
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonBadge,
    IonLabel,
    IonItemDivider,
    Sub,
    Header,
    Footer,
  },

  data() {
    return {
      loaded: false,
    };
  },

  async ionViewWillEnter() {
    await this.$store.dispatch("getMyEventDetails", this.$route.params.id);
    this.loaded = true;
  },
});
</script>

<style lang="scss" scoped>
#container {
  .commandes,
  .budget {
    .plats {
      display: flex;
      align-items: center;
      padding: 1em;

      .info {
        width: 70%;
        padding: 0 1em;
        color: #7e2727;
        font-weight: bold;
      }

      .img-container {
        height: 60px;
        min-width: 60px;
        width: 30%;
        img {
          height: 100%;
          width: 100%;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>