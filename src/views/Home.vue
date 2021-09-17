<template>
  <ion-page>
    <Header></Header>
    <ion-content :fullscreen="true">
      <div id="container">
        <ion-card>
          <ion-card-header>
            <router-link :to="{ name: 'Scan' }">
              <ion-button size="large"> Scan QR Code </ion-button>
            </router-link>
          </ion-card-header>

          <ion-card-content>
            <input
              type="text"
              name="code"
              v-model="code"
              placeholder="Entrer un code"
            />
            <ion-button @click="goToEvent()">GO</ion-button>
          </ion-card-content>
        </ion-card>

        <router-link :to="{ name: 'SignIn' }">
          <ion-button v-if="!this.$store.state.userIsLoggedIn">
            Connexion
          </ion-button>
        </router-link>

        <router-link :to="{ name: 'SignUp' }">
          <ion-button v-if="!this.$store.state.userIsLoggedIn">
            Créer un compte
          </ion-button>
        </router-link>
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
  data() {
    return {
      code: "",
    };
  },
  methods: {
    goToEvent() {
      this.$store.dispatch("joinEvent", this.code);
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