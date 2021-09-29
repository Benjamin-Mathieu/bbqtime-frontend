<template>
  <ion-menu color="primary" side="start" menu-id="nav" content-id="main">
    <ion-content @click="closeMenu()" class="menu">
      <ion-list-header>
        <router-link :to="{ name: 'Home' }">
          <img src="../../public/assets/logo1.png" alt="logo-bbqtime" />
        </router-link>
      </ion-list-header>
      <ion-list v-if="!this.$store.state.userIsLoggedIn" lines="none">
        <router-link class="links" :to="{ name: 'Events' }">
          <ion-item>Evènements</ion-item>
        </router-link>
        <router-link class="links" :to="{ name: 'Shop' }">
          <ion-item>Panier</ion-item>
        </router-link>
        <router-link class="links" :to="{ name: 'SignIn' }">
          <ion-item>Connexion</ion-item>
        </router-link>
      </ion-list>
      <ion-list v-else lines="none">
        <router-link class="links" :to="{ name: 'Events' }">
          <ion-item>Evènements</ion-item>
        </router-link>
        <router-link class="links" :to="{ name: 'Orders' }">
          <ion-item>Commandes</ion-item>
        </router-link>
        <router-link class="links" :to="{ name: 'Shop' }">
          <ion-item>Panier</ion-item>
        </router-link>
        <router-link class="links" :to="{ name: 'AddEvent' }">
          <ion-item>Créer un évènement</ion-item>
        </router-link>
        <router-link class="links" :to="{ name: 'Scan' }">
          <ion-item>Scan</ion-item>
        </router-link>
        <router-link class="links" :to="{ name: 'Account' }">
          <ion-item>Mon compte</ion-item>
        </router-link>
        <router-link class="links" :to="{ name: 'Settings' }">
          <ion-item>Paramètres</ion-item>
        </router-link>
        <ion-item slot="end">
          <ion-button size="medium" @click="logoutUser()">
            Déconnexion
          </ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script>
import {
  IonMenu,
  IonItem,
  IonList,
  IonContent,
  IonButton,
  IonListHeader,
  menuController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { mapMutations } from "vuex";

export default defineComponent({
  name: "Navigation",
  components: {
    IonMenu,
    IonItem,
    IonList,
    IonButton,
    IonListHeader,
    IonContent,
  },
  methods: {
    ...mapMutations(["setUserIsLoggedIn", "setToken", "setUserInformation"]),

    openMenu() {
      menuController.enable(true, "nav");
      menuController.open("nav");
    },

    closeMenu() {
      menuController.close();
    },

    logoutUser() {
      this.$store.dispatch("logoutUser");
    },
  },
});
</script>

<style lang="scss" scoped>
ion-item {
  --background: #e5e5e5;
}
ion-list {
  padding-bottom: 0px;
  padding-top: 0px;

  .links {
    text-decoration: none;
  }
}
</style>