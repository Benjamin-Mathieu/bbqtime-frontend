<template>
  <ion-app>
    <OnePage></OnePage>
    <Navigation></Navigation>
    <ShopMenu></ShopMenu>
    <ion-router-outlet id="main" />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import Navigation from "./components/Sidebars/Navigation.vue";
import ShopMenu from "./components/Sidebars/ShopMenu.vue";
import OnePage from "./components/OnePage";
import { SplashScreen } from "@capacitor/splash-screen";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
    Navigation,
    ShopMenu,
    OnePage,
  },
  mounted() {
    SplashScreen.show({
      showDuration: 2000,
      autoHide: true,
    });
    this.$store.dispatch("userIsLogged");
  },
});
</script>

<style lang="scss">
ion-card {
  width: 80%;
  margin: 1em auto;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}
</style>