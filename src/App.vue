<template>
  <ion-app>
    <!-- Menu -->
    <ion-menu side="start" menu-id="first" content-id="main">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list v-if="!this.$store.state.userIsLoggedIn">
          <ion-item href="/sign-in"> Connexion </ion-item>
          <ion-item href="/sign-up">Inscription</ion-item>
        </ion-list>
        <ion-list v-else>
          <ion-item href="/event">Evènements</ion-item>
          <ion-item href="/categorie">Catégories</ion-item>
          <ion-item href="/scan">Scan</ion-item>
          <Logout></Logout>
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