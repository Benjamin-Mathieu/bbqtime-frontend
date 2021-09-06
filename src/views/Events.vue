<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <h1>okoke</h1>
      <h1>okoke</h1>

      <ion-card v-for="event in this.$store.state.events" :key="event.id">
        <ion-grid>
          <ion-row>
            <ion-col size="2">
              <ion-img
                alt="event-img"
                src="../../public/uploads/bbq.jpeg"
              ></ion-img>
            </ion-col>
            <ion-col size="10">
              <ion-item>
                <ion-label
                  ><b>{{ event.name }}</b> ID {{ event.id }}</ion-label
                >
                <ion-icon v-if="event.private" :icon="lockClosed"></ion-icon>

                <router-link :to="'/event/' + event.id + '/categories'"
                  ><ion-button fill="outline" slot="end"
                    >Détails</ion-button
                  ></router-link
                >
              </ion-item>

              <ion-card-content>
                <p>
                  {{ event.description }}
                </p>
                <p>
                  <b>Localisation:</b>
                  {{ event.zipcode + " " + event.address + " " + event.city }}
                </p>
              </ion-card-content>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card>

      <router-link to="/add-event">
        <ion-button href="/add-event" fill="solid"
          >Créer un évènement</ion-button
        >
      </router-link>
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
import { lockClosed } from "ionicons/icons";

export default defineComponent({
  name: "Events",
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
  },
  setup() {
    return {
      lockClosed,
    };
  },
  mounted() {
    this.$store.dispatch("getEvents");
  },
});
</script>

<style scoped>
</style>