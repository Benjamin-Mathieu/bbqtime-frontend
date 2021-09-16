<template>
  <ion-page>
    <Header></Header>
    <Sub title="Vos commandes"></Sub>
    <ion-content>
      <ion-card v-for="order in this.$store.state.orders" :key="order.id">
        <ion-grid>
          <ion-row>
            <ion-col size="2">
              <ion-img alt="event-img" :src="order.event.photo_url"></ion-img>
            </ion-col>
            <ion-col size="10">
              <ion-item>
                <ion-icon slot="start"></ion-icon>
                <ion-label
                  ><b>{{ order.event.name }}</b></ion-label
                >
              </ion-item>

              <ion-card-content>
                <p>
                  {{ order.description }}
                  <b>Localisation:</b>
                  {{
                    order.event.zipcode +
                    " " +
                    order.event.address +
                    " " +
                    order.event.city
                  }}
                </p>
                <p><b>Total</b> {{ order.cost + " €" }}</p>
                <ion-button
                  slot="end"
                  size="small"
                  fill="outline"
                  @click="toggleDetails()"
                >
                  <ion-icon :icon="chevronDownOutline"></ion-icon>
                </ion-button>
              </ion-card-content>
            </ion-col>
          </ion-row>
          <div v-if="showDetails">
            <ion-card
              v-for="orderplat in order.orders_plats"
              :key="orderplat.id"
            >
              <ion-grid>
                <ion-row>
                  <ion-col size="2">
                    <img alt="plat-img" :src="orderplat.plat.photo_url" />
                  </ion-col>
                  <ion-col size="10">
                    <ion-item>
                      <ion-label
                        ><b> {{ orderplat.plat.libelle }} </b></ion-label
                      >
                    </ion-item>
                    <ion-item>
                      <b>Quantité:</b> {{ orderplat.quantity }}
                    </ion-item>
                    <ion-item>
                      <b>Prix unitaire: </b> {{ orderplat.plat.price }} €
                    </ion-item>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-card>
          </div>
        </ion-grid>
      </ion-card>
    </ion-content>
    <!-- <ion-content>
      <ion-card>
        <ion-card-content>Pas de commande pour le moment</ion-card-content>
      </ion-card>
    </ion-content> -->
    <Footer></Footer>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonButton,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import { chevronDownOutline } from "ionicons/icons";
import store from "../store/store";
import Sub from "../components/Sub.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default defineComponent({
  name: "Orders",
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonCardContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonButton,
    IonImg,
    IonGrid,
    IonRow,
    IonCol,
    Header,
    Sub,
    Footer,
  },
  setup() {
    return {
      chevronDownOutline,
    };
  },
  data() {
    return {
      showDetails: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch("getOrders");
    next();
  },
  methods: {
    getDetails(orderId) {
      this.$store.dispatch("getOrderDetails", { id: orderId });
    },
    toggleDetails() {
      this.showDetails = !this.showDetails;
    },
  },
});
</script>
