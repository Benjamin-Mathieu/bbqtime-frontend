<template>
  <h1>Commandes</h1>

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
            <ion-button fill="outline" slot="end">Détails</ion-button>
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
          </ion-card-content>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-card>
</template>

<script>
import { defineComponent } from "vue";
import {
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
  },
});
</script>

<style scoped>
</style>