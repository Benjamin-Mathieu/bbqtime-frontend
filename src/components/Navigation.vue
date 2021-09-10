<template>
  <ion-menu side="start" menu-id="nav" content-id="main">
    <ion-header>
      <router-link to="/home"><ion-item>Home</ion-item></router-link>
    </ion-header>
    <ion-content>
      <ion-list v-if="!this.$store.state.userIsLoggedIn">
        <router-link :to="{ name: 'Events' }">
          <ion-item>Evènements</ion-item>
        </router-link>
        <router-link :to="{ name: 'Orders' }">
          <ion-item>Commandes</ion-item>
        </router-link>
        <router-link :to="{ name: 'Shop' }">
          <ion-item>Panier</ion-item>
        </router-link>
        <router-link :to="{ name: 'SignIn' }">
          <ion-item>Connexion</ion-item>
        </router-link>
      </ion-list>
      <ion-list v-else>
        <router-link :to="{ name: 'Events' }">
          <ion-item>Evènements</ion-item>
        </router-link>
        <router-link :to="{ name: 'Orders' }">
          <ion-item>Commandes</ion-item>
        </router-link>
        <router-link :to="{ name: 'Shop' }">
          <ion-item>Panier</ion-item>
        </router-link>
        <router-link :to="{ name: 'Scan' }">
          <ion-item>Scan</ion-item>
        </router-link>
        <router-link :to="{ name: 'Account' }">
          <ion-item>Mon compte</ion-item>
        </router-link>

        <ion-item>Paramètres</ion-item>
        <Logout></Logout>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script>
import {
  IonMenu,
  IonHeader,
  IonItem,
  IonList,
  IonContent,
  menuController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import Logout from "./Logout.vue";

export default defineComponent({
  name: "Navigation",
  components: {
    IonMenu,
    IonHeader,
    IonItem,
    IonList,
    IonContent,
    Logout,
  },
  methods: {
    openMenu() {
      menuController.enable(true, "nav");
      menuController.open("nav");
    },
  },
});
</script>