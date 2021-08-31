<template>
  <ion-app>
    <!-- Menu -->
    <ion-menu side="start" menu-id="first" content-id="main">
      <ion-header>
        <ion-item href="/home">Home</ion-item>
      </ion-header>
      <ion-content>
        <ion-list v-if="!this.$store.state.userIsLoggedIn">
          <router-link to="/event">Evènements</router-link>
          <router-link to="/order"><ion-item>Commandes</ion-item></router-link>
          <router-link to="/shop"><ion-item>Panier</ion-item></router-link>
          <router-link to="/sign-up"><ion-item>Inscription</ion-item></router-link>
          <router-link to="/sign-in"><ion-item>Connexion</ion-item></router-link>
        </ion-list>
        <ion-list v-else>
          <router-link to="/event"><ion-item>Evènements</ion-item></router-link>
          <router-link to="/order"><ion-item>Commandes</ion-item></router-link>
          <router-link to="/shop"><ion-item>Panier</ion-item></router-link>
          <router-link to="/scan"><ion-item>Scan</ion-item></router-link>
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