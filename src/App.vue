<template>
  <ion-app>
    <Navigation></Navigation>
    <Header></Header>
    <ShopMenu></ShopMenu>
    <Footer></Footer>
    <ion-router-outlet id="main" />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import Navigation from "./components/Navigation.vue";
import Header from "./components/Header.vue";
import ShopMenu from "./components/ShopMenu.vue";
import Footer from "./components/Footer.vue";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
    Navigation,
    Header,
    ShopMenu,
    Footer,
  },
  mounted() {
    console.log(localStorage.getItem("token"));
    // Check if user already logged in
    if (localStorage.getItem("token") === "null") {
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
