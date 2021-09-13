<template>
  <ion-menu side="start" menu-id="nav" content-id="main">
    <ion-header>
      <router-link to="/home"><ion-item>Home</ion-item></router-link>
    </ion-header>
    <ion-content class="menu">
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
      </ion-list>
      <ion-button size="medium" @click="logoutUser">Se déconnecter</ion-button>
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
  IonButton,
  menuController,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Navigation",
  components: {
    IonMenu,
    IonHeader,
    IonItem,
    IonList,
    IonButton,
    IonContent,
  },
  methods: {
    openMenu() {
      menuController.enable(true, "nav");
      menuController.open("nav");
    },

    logoutUser() {
      localStorage.clear();
      this.$store.commit("setUserIsLoggedIn", false);
      this.$store.commit("setToken", null);
      this.$store.commit("setUserInformation", null);
      this.$router.push("/home");
    },
  },
});
</script>