<template>
  <h1>Commandes</h1>
  <h1>Commandes</h1>

  <ion-page>
    <ion-content v-if="this.$store.state.orders.length > 0">
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
    <ion-content v-else>
      <ion-card
        ><ion-card-content
          >Pas de commande pour le moment</ion-card-content
        ></ion-card
      >
    </ion-content>
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

export default defineComponent({
  name: "Order",
  component: {
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
  },
  setup() {
    return {
      chevronDownOutline,
    };
  },
  data() {
    return {
      showDetails: true,
    };
  },
  mounted() {
    this.$store.dispatch("getOrders");
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

<style scoped>
.order-details {
  background-color: #ccc;
}
</style>