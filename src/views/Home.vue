<template>
  <ion-page>
    <Header></Header>
    <ion-content :fullscreen="true">
      <div id="container">
        <ion-card>
          <ion-card-header>
            <ion-button size="large" href="/scan">Scan QR Code</ion-button>
            <ion-button size="large" @click="pick()"
              >Test pick image</ion-button
            >
          </ion-card-header>

          <ion-card-content>
            <input type="text" name="code" placeholder="Entrer un code" />
            <ion-button>GO</ion-button>
          </ion-card-content>
        </ion-card>

        <ion-button
          v-if="!this.$store.state.userIsLoggedIn"
          size="medium"
          href="/sign-in"
          fill="outline"
          >Connexion</ion-button
        >
        <ion-button
          v-if="!this.$store.state.userIsLoggedIn"
          size="medium"
          href="/sign-up"
          >Créer un compte</ion-button
        >
      </div>
    </ion-content>
    <Footer></Footer>
  </ion-page>
</template>

<script>
import {
  IonContent,
  IonPage,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardContent,
} from "@ionic/vue";
import { defineComponent } from "vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import GetPicture from "../services/camera";

export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonPage,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardContent,
    Header,
    Footer,
  },
  methods: {
    pick() {
      GetPicture.browser();
    },
  },
});
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>