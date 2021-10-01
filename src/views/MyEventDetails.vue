<template>
  <ion-page>
    <Header></Header>
    <Sub title="Détails"></Sub>
    <ion-content>
      <ion-button @click="saveQrcode()">
        Télécharger Qrcode
        <ion-icon slot="end" :icon="download"></ion-icon
      ></ion-button>

      <ion-card class="details">
        <ion-card-header>
          <ion-card-title>Détails</ion-card-title>
        </ion-card-header>
        <ion-card
          v-for="order in this.$store.state.events.myEventOrders.orders"
          :key="order.id"
          class="commande"
        >
          <ion-card-header>
            Commande de {{ order.user.firstname }} {{ order.user.name }}
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <div
                v-for="(orderPlat, index) in order.orders_plats"
                :key="orderPlat.id"
              >
                <ion-item button type="button" @click="status(index)">
                  {{ orderPlat.plat.libelle }}
                  <ion-badge>{{ orderPlat.quantity }}</ion-badge>
                </ion-item>
              </div>
            </ion-list>

            <ion-item lines="none">
              <ion-label>Status</ion-label>
              <ion-select
                ok-text="Valider"
                cancel-text="Fermer"
                v-model="order.status"
                @ionChange="selectedValue($event, order.id)"
              >
                <ion-select-option :value="0">En cours</ion-select-option>
                <ion-select-option :value="1">Préparé</ion-select-option>
                <ion-select-option :value="2">Livré</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-card-content>
        </ion-card>
      </ion-card>

      <ion-card class="commandes">
        <ion-card-header>
          <ion-card-title>Commandes</ion-card-title>
        </ion-card-header>
        <ion-card
          v-for="plat in this.$store.state.events.myEventDetails.plats"
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
          v-for="plat in this.$store.state.events.myEventDetails.plats"
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
            Montant total:
            {{ this.$store.state.events.myEventDetails.totalBudget }} €
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
  IonCardContent,
  IonButton,
  IonBadge,
  IonIcon,
  IonImg,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonItemDivider,
  IonList,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import Sub from "../components/Sub.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { download } from "ionicons/icons";

export default defineComponent({
  name: "MyEventDetails",
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonBadge,
    IonIcon,
    IonImg,
    IonItem,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    IonItemDivider,
    IonList,
    IonSelect,
    IonSelectOption,
    Sub,
    Header,
    Footer,
  },
  setup() {
    return {
      download,
    };
  },
  ionViewWillEnter() {
    this.$store.dispatch("getMyEventDetails", this.$route.params.id);
    this.$store.dispatch("getMyEventOrders");
  },
  methods: {
    saveQrcode() {
      this.$store.dispatch("saveQrcode");
    },
    selectedValue(ev, orderId) {
      const order = {
        id: orderId,
        status: ev.target.value,
      };
      this.$store.dispatch("putOrderStatus", order);
    },
  },
});
</script>
<style>
.commandes,
.budget {
  width: 80%;
  margin: auto;
}

ion-card .commande {
  --background: #ccc;
}
</style>