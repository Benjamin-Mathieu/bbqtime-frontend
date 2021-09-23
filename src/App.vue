<template>
  <ion-app>
    <Navigation></Navigation>
    <ShopMenu></ShopMenu>
    <ion-router-outlet id="main" />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import Navigation from "./components/Navigation.vue";
import ShopMenu from "./components/ShopMenu.vue";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
    Navigation,
    ShopMenu,
  },
  mounted() {
    console.log(localStorage.getItem("token"));
    // Check if user already logged in
    if (localStorage.getItem("token") == "null") {
      this.$store.commit("setUserIsLoggedIn", false);
    } else {
      this.$store.commit("setToken", localStorage.getItem("token"));
      this.$store.commit(
        "setUserInformation",
        localStorage.getItem("userInformation")
      );
      this.$store.commit("setUserIsLoggedIn", true);
    }
  },
});
</script>

<style lang="scss">
ion-card {
  width: 80%;
  margin: auto;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>