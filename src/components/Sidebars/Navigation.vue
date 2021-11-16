<template>
  <ion-menu color="primary" side="start" menu-id="nav" content-id="main">
    <ion-content @click="closeMenu()" class="menu">
      <div id="container">
      <ion-list-header>
        <router-link :to="{ name: 'Home' }">
          <img src="../../../public/assets/logo1.png" alt="logo-bbqtime" />
        </router-link>
      </ion-list-header>
      <ion-list v-if="!this.$store.state.auth.userIsLoggedIn" lines="none">
        <router-link class="links" :to="{ name: 'Events' }">
          <ion-item>
            <p>Evènements</p>
          </ion-item>
        </router-link>
        <router-link class="links" :to="{ name: 'Shop' }">
          <ion-item>
            <p>Panier</p>
          </ion-item>
        </router-link>
        <router-link class="links" :to="{ name: 'SignIn' }">
          <ion-item>
            <p>Connexion</p>
          </ion-item>
        </router-link>
      </ion-list>
      <ion-list v-else lines="none">
        <ion-item>
          <p @click.stop="show()">Evènements</p>
        </ion-item>
        <ion-item v-if="isClicked">
          <ul>
            <li>
              <router-link class="links" :to="{ name: 'Events' }">
                Publiques
              </router-link>
            </li>
            <li>
              <router-link class="links" :to="{ name: 'MyEvents' }">
                Mes évènements
              </router-link>
            </li>
          </ul>
        </ion-item>
        <router-link class="links" :to="{ name: 'Orders' }">
          <ion-item>
            <p>Commandes</p>
          </ion-item>
        </router-link>
        <router-link class="links" :to="{ name: 'Shop' }">
          <ion-item>
            <p>Panier</p>
          </ion-item>
        </router-link>
        <router-link class="links" :to="{ name: 'AddEvent' }">
          <ion-item>
            <p>Créer un évènement</p>
          </ion-item>
        </router-link>
        <router-link class="links" :to="{ name: 'Scan' }">
          <ion-item>
            <p>Scan</p>
          </ion-item>
        </router-link>
        <router-link class="links" :to="{ name: 'Account' }">
          <ion-item>
            <p>Mon compte</p>
          </ion-item>
        </router-link>
        <div class="logout-button">
          <ion-button size="medium" @click="logoutUser()">
            Déconnexion
          </ion-button>
        </div>
      </ion-list>
      </div>
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

  data() {
    return {
      isClicked: false,
    };
  },

  methods: {
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

    show() {
      this.isClicked = !this.isClicked;
    },
  },
});
</script>

<style lang="scss" scoped>
#container {
  padding-top: 2em;
}

ion-item {
  --background: #e5e5e5;
  p {
    color: #853538;
  }
}
ion-list {
  padding-bottom: 0px;
  padding-top: 0px;

  .links {
    text-decoration: none;
  }

  .logout-button {
    padding-top: 1em;
    text-align: center;
    background-color: #e5e5e5;
  }
}
</style>