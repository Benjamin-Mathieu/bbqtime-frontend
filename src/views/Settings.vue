<template>
  <ion-page>
    <Header></Header>
    <Sub title="Paramètres de l'application"></Sub>
    <ion-content>
      <ion-card>
        <ion-card-header>Paramètres généraux</ion-card-header>
        <ion-card-content>
          <ion-range min="0" max="100" step="2" :value="brightness">
            <ion-icon size="small" slot="start" :icon="sunny"></ion-icon>
            <ion-icon slot="end" :icon="sunny"></ion-icon>
          </ion-range>
          <ion-button @click="setB()">Test luminosité</ion-button>
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
import { ScreenBrightness } from "@capacitor-community/screen-brightness";

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
  data() {
    return {
      brightness: 50,
    };
  },
  methods: {
    async setB() {
      // Set the brightness:
      const halfBright = 0.5;
      await ScreenBrightness.setBrightness({ halfBright });
    },
  },
});
</script>
<style>
</style>