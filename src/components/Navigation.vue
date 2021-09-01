<template>
  <ion-menu side="start" menu-id="nav" content-id="main">
    <ion-header>
      <router-link to="/home"><ion-item>Home</ion-item></router-link>
    </ion-header>
    <ion-content>
      <ion-list v-if="!this.$store.state.userIsLoggedIn">
        <router-link to="/events"><ion-item>Evènements</ion-item></router-link>
        <router-link to="/orders"><ion-item>Commandes</ion-item></router-link>
        <router-link to="/shop"><ion-item>Panier</ion-item></router-link>
        <router-link to="/sign-up"
          ><ion-item>Inscription</ion-item></router-link
        >
        <router-link to="/sign-in"><ion-item>Connexion</ion-item></router-link>
      </ion-list>
      <ion-list v-else>
        <router-link to="/events"><ion-item>Evènements</ion-item></router-link>
        <router-link to="/orders"><ion-item>Commandes</ion-item></router-link>
        <router-link to="/shop"><ion-item>Panier</ion-item></router-link>
        <router-link to="/scan"><ion-item>Scan</ion-item></router-link>
        <router-link to="/account"><ion-item>Mon compte</ion-item></router-link>
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