<template>
  <ion-app>
    <!-- Menu -->
    <ion-menu side="start" menu-id="first" content-id="main">
      <ion-header>
        <ion-item href="/home">Home</ion-item>
      </ion-header>
      <ion-content>
        <ion-list v-if="!this.$store.state.userIsLoggedIn">
          <ion-item href="/event">Evènements</ion-item>
          <ion-item href="/order">Commandes</ion-item>
          <ion-item href="/shop"> Panier </ion-item>
          <ion-button href="/sign-up">Inscription</ion-button>
          <ion-button href="/sign-in">Connexion</ion-button>
        </ion-list>
        <ion-list v-else>
          <ion-item href="/event">Evènements</ion-item>
          <ion-item href="/order">Commandes</ion-item>
          <ion-item href="/shop"> Panier </ion-item>
          <ion-item href="/scan">Scan</ion-item>
          <ion-item>Mon compte</ion-item>
          <ion-item>Paramètres</ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <!-- Headbar -->
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title size="large">BBQ Time</ion-title>
        <Logout v-if="this.$store.state.userIsLoggedIn" slot="end"></Logout>
      </ion-toolbar>
    </ion-header>

    <ion-router-outlet id="main" />
  </ion-app>
</template>

<script>
import {
  IonApp,
  IonRouterOutlet,
  IonMenu,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonItem,
  IonList,
  IonContent,
  menuController,
  IonMenuButton,
  IonButtons,
} from "@ionic/vue";
import { defineComponent } from "vue";
import Logout from "./components/Logout.vue";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
    IonMenu,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonItem,
    IonList,
    IonContent,
    IonMenuButton,
    IonButtons,
    Logout,
  },
  mounted() {
    // Check if user already logged in
    if (localStorage.getItem("token")) {
      this.$store.commit("setUserIsLoggedIn", true);
      this.$store.commit("setToken", localStorage.getItem("token"));
      this.$store.commit("setUserInformation", localStorage.getItem("user"));
    } else {
      this.$store.commit("setUserIsLoggedIn", false);
    }
  },
  methods: {
    openFirst() {
      menuController.enable(true, "first");
      menuController.open("first");
    },
  },
});
</script>