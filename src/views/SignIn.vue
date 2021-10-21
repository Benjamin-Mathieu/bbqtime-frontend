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
              <ion-input
                :type="typeInputPassword"
                placeholder="Mot de passe"
                v-model="password"
                required
                ref="inputPassword"
              ></ion-input>
              <ion-button @click="show()" fill="clear" slot="end">
                <ion-icon :icon="icon"></ion-icon>
              </ion-button>
            </ion-item>
            <router-link :to="{ name: 'ResetPassword' }">
              <ion-item>Mot de passe oublié ?</ion-item>
            </router-link>
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
  IonIcon,
} from "@ionic/vue";
import Sub from "../components/Sub.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { eyeOutline, eyeOffOutline } from "ionicons/icons";

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
    IonIcon,
  },
  name: "SignIn",

  data() {
    return {
      email: "testpost@gmail.com",
      password: "test",
      showPassword: false,
      typeInputPassword: "password",
      icon: eyeOutline,
    };
  },
  methods: {
    authUser() {
      const user = { email: this.email, password: this.password };
      this.$store.dispatch("loginUser", user);
    },
    show() {
      this.showPassword = !this.showPassword;
      this.showPassword
        ? ((this.typeInputPassword = "password"), (this.icon = eyeOutline))
        : ((this.typeInputPassword = "text"), (this.icon = eyeOffOutline));
    },
  },
});
</script>

<style scoped>
</style>