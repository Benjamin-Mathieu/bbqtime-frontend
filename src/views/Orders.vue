<template>
  <h1>Commandes</h1>
  <ion-page>
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
                <ion-button slot="end" size="small" fill="outline"
                  >Détails</ion-button
                >
              </ion-card-content>
            </ion-col>
          </ion-row>
          <ion-card v-for="orderplat in order.orders_plats" :key="orderplat.id">
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
                    <b>Quantité: {{ orderplat.plat.quantity }} </b>
                  </ion-item>
                  <ion-item>
                    <b>Prix: {{ orderplat.plat.price }} </b>
                  </ion-item>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-card>
        </ion-grid>
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
  mounted() {
    this.$store.dispatch("getOrders");
    console.log(this.detail);
  },
  methods: {
    getDetails(orderId) {
      this.$store.dispatch("getOrderDetails", { id: orderId });
    },
  },
});
</script>

<style scoped>
.order-details {
  background-color: #ccc;
}
</style>