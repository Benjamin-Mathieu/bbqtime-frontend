<template>
  <ion-app>
    <Navigation></Navigation>
    <Header></Header>
    <ion-router-outlet id="main" />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import Navigation from "./components/Navigation.vue";
import Header from "./components/Header.vue";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
    Navigation,
    Header,
  },
  mounted() {
    // Check if user already logged in
    if (localStorage.getItem("token")) {
      this.$store.commit("setToken", localStorage.getItem("token"));
      this.$store.commit(
        "setUserInformation",
        localStorage.getItem("userInformation")
      );
      this.$store.commit("setUserIsLoggedIn", true);
    } else {
      this.$store.commit("setUserIsLoggedIn", false);
    }
  },
});
</script>