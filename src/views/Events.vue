<template>
  <ion-page>
    <Header></Header>
    <Sub title="Évènements"></Sub>
    <ion-content :fullscreen="true">
      <ion-card v-for="event in this.$store.state.events[0]" :key="event.id">
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

      <router-link :to="{ name: 'AddEvent' }">
        <ion-button href="/add-event" fill="solid"
          >Créer un évènement</ion-button
        >
      </router-link>
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
import store from "../store/store";
import Header from "../components/Header.vue";
import Sub from "../components/Sub.vue";
import Footer from "../components/Footer.vue";

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
    Header,
    Sub,
    Footer,
  },
  setup() {
    return {
      lockClosed,
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log(to, from);
    store.dispatch("getEvents");
    next();
  },
});
</script>

<style scoped>
</style>