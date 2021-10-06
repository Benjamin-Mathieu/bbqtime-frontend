<template>
  <ion-page>
    <Header></Header>
    <Sub title="Connexion"></Sub>
    <ion-content>
      <form @submit.prevent="authUser()" method="post">
        <ion-card>
          <ion-card-content>
            <ion-item lines="none">
              <ion-label position="floating">E-mail</ion-label>
              <ion-input type="email" v-model="email" required></ion-input>
            </ion-item>
            <ion-item lines="none">
              <ion-label position="floating">Mot de passe</ion-label>
              <ion-input
                type="password"
                v-model="password"
                required
              ></ion-input>
            </ion-item>
            <p>Mot de passe oublié ?</p>
            <ion-button slot="end" type="submit">Connexion</ion-button>
          </ion-card-content>
        </ion-card>
        <router-link :to="{ name: 'SignUp' }">
          <ion-button size="small"> Nouveau compte </ion-button>
        </router-link>
      </form>
    </ion-content>
    <Footer></Footer>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonLabel,
  IonInput,
  IonItem,
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonButton,
} from "@ionic/vue";
import Sub from "../components/Sub.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default defineComponent({
  components: {
    IonLabel,
    IonInput,
    IonItem,
    IonPage,
    IonContent,
    Sub,
    Header,
    Footer,
    IonCard,
    IonCardContent,
    IonButton,
  },
  name: "SignIn",
  data() {
    return {
      email: "testpost@gmail.com",
      password: "test",
    };
  },
  methods: {
    authUser() {
      const user = { email: this.email, password: this.password };
      this.$store.dispatch("loginUser", user);
    },
  },
});
</script>

<style scoped>
</style>