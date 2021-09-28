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
import jwt_decode from "jwt-decode";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
    Navigation,
    ShopMenu,
  },
  mounted() {
    // Check if user already logged in
    if (
      !localStorage.getItem("token") ||
      localStorage.getItem("token") === "null"
    ) {
      this.$store.commit("setUserIsLoggedIn", false);
      this.$router.push("/sign-in");
    } else {
      const token = jwt_decode(localStorage.getItem("token"));
      const user = { email: token.email, password: token.password };

      this.$store.dispatch("loginUser", user);
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