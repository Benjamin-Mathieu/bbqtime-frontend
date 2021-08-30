<template>
  <h1>Evènements</h1>

  <ion-card v-for="event in this.$store.state.events" :key="event.id">
    <ion-item>
      <ion-icon slot="start"></ion-icon>
      <ion-label
        ><b>{{ event.name }}</b></ion-label
      >
      <ion-button fill="outline" slot="end">Détails</ion-button>
    </ion-item>

    <ion-card-content>
      <p>
        {{ event.description }}
      </p>
      <p>
        Localisation:
        {{ event.zipcode + " " + event.address + " " + event.city }}
      </p>
    </ion-card-content>
  </ion-card>

  <ion-button href="/add-event" fill="solid">Créer un évènement</ion-button>
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
} from "@ionic/vue";

export default defineComponent({
  name: "Event",
  components: {
    IonCard,
    IonCardContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonButton,
  },
  mounted() {
    this.$store.dispatch("getEvents");
  },
});
</script>

<style scoped>
</style>