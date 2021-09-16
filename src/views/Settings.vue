<template>
  <ion-page>
    <Header></Header>
    <Sub title="Paramètres de l'application"></Sub>
    <ion-content>
      <ion-card>
        <ion-card-header>Paramètres généraux</ion-card-header>
        <ion-card-content>
          <ion-range min="0" max="100" step="2" value="50">
            <ion-icon size="small" slot="start" :icon="sunny"></ion-icon>
            <ion-icon slot="end" :icon="sunny"></ion-icon>
          </ion-range>
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
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonRange,
  IonIcon,
} from "@ionic/vue";
import Sub from "../components/Sub.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { sunny } from "ionicons/icons";

export default defineComponent({
  name: "Settings",
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonRange,
    IonIcon,
    Header,
    Sub,
    Footer,
  },
  setup() {
    return {
      sunny,
    };
  },
});
</script>
<style>
</style>