<template>
  <ion-page>
    <Header></Header>
    <Sub title="Mes évènements"></Sub>

    <ion-content v-if="this.$store.state.myEvents.length > 0">
      <ion-card v-for="event in this.$store.state.myEvents" :key="event.id">
        <ion-grid>
          <ion-row>
            <ion-col size="2">
              <ion-img alt="event-img" :src="event.photo_url"></ion-img>
            </ion-col>
            <ion-col size="10">
              <ion-item>
                <ion-label
                  ><b>{{ event.name }}</b> ID {{ event.id }}
                </ion-label>

                <router-link
                  :to="{ name: 'MyEventDetails', params: { id: event.id } }"
                >
                  <ion-button fill="outline" slot="end"> Details </ion-button>
                </router-link>
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
    </ion-content>
    <ion-content v-else>
      <ion-card>
        <ion-card-content>
          Pas d'évènement crée pour le moment
        </ion-card-content>
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
  IonImg,
  IonLabel,
  IonCard,
  IonCardContent,
  IonItem,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import Sub from "../components/Sub.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default defineComponent({
  name: "MyEvents",
  components: {
    IonPage,
    IonContent,
    IonImg,
    IonLabel,
    IonCard,
    IonCardContent,
    IonItem,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    Sub,
    Header,
    Footer,
  },
  mounted() {
    this.$store.dispatch("getMyEvents");
  },
});
</script>
<style>
</style>