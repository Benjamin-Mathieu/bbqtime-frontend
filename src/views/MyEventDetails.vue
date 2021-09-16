<template>
  <ion-page>
    <Header></Header>
    <Sub title="Détails"></Sub>
    <ion-content>
      <ion-card class="commandes">
        <ion-card-header>
          <ion-card-title>Commandes</ion-card-title>
        </ion-card-header>
        <ion-card
          v-for="plat in this.$store.state.myEventDetails.plats"
          :key="plat.id"
        >
          <ion-grid>
            <ion-row>
              <ion-col size="2">
                <ion-img alt="plat-img" :src="plat.public_img"></ion-img>
              </ion-col>
              <ion-col size="10">
                <ion-item>
                  <ion-label>{{ plat.libelle }}</ion-label>
                  <ion-badge slot="end">{{ plat.quantity }}</ion-badge>
                </ion-item>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card>
      </ion-card>

      <ion-card class="budget">
        <ion-card-header>
          <ion-card-title>Budget</ion-card-title>
        </ion-card-header>
        <ion-card
          v-for="plat in this.$store.state.myEventDetails.plats"
          :key="plat.id"
        >
          <ion-grid>
            <ion-row>
              <ion-col size="2">
                <ion-img alt="plat-img" :src="plat.public_img"></ion-img>
              </ion-col>
              <ion-col size="10">
                <ion-item>
                  <ion-label>{{ plat.libelle }}</ion-label>
                  <ion-item slot="end">{{ plat.total }} €</ion-item>
                </ion-item>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card>
        <ion-item-divider color="primary">
          <ion-label>
            Montant total: {{ this.$store.state.myEventDetails.totalBudget }} €
          </ion-label>
        </ion-item-divider>
      </ion-card>
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
  IonImg,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonItemDivider,
} from "@ionic/vue";
import Sub from "../components/Sub.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default defineComponent({
  name: "MyEventDetails",
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonBadge,
    IonImg,
    IonItem,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    IonItemDivider,
    Sub,
    Header,
    Footer,
  },
  mounted() {
    this.$store.dispatch("getMyEventDetails", this.$route.params.id);
  },
});
</script>
<style>
.commandes,
.budget {
  width: 80%;
  margin: auto;
}
</style>