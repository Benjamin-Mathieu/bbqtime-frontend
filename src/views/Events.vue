<template>
  <ion-page>
    <Header></Header>
    <Sub title="Évènements"></Sub>
    <ion-content>
      <router-link :to="{ name: 'AddEvent' }">
        <ion-button>Créer un évènement</ion-button>
      </router-link>
      <ion-card v-for="event in this.$store.state.events" :key="event.id">
        <ion-grid>
          <ion-row>
            <ion-col size="2">
              <img
                alt="event-img"
                src="../../public/uploads/bbq.jpeg"
                style="width: 100%; height: 100%; object-fit: cover"
              />
            </ion-col>
            <ion-col size="10">
              <ion-item>
                <ion-label
                  ><b>{{ event.name }}</b></ion-label
                >
                <ion-icon v-if="event.private" :icon="lockClosed"></ion-icon>

                <router-link
                  v-if="!event.private"
                  :to="{ name: 'Categories', params: { id: event.id } }"
                >
                  <ion-button slot="end">Détails</ion-button>
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
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import { lockClosed } from "ionicons/icons";
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
  ionViewWillEnter() {
    this.$store.dispatch("getEvents");
  },
});
</script>

<style lang="scss" scoped>
ion-card {
  margin: 1em auto;
}
</style>