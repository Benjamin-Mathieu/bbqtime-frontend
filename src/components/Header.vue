<template>
  <ion-header :translucent="true">
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button></ion-menu-button>
      </ion-buttons>
      <ion-title size="large">BBQ Time</ion-title>
      <Logout v-if="this.$store.state.userIsLoggedIn" slot="end"></Logout>
    </ion-toolbar>
  </ion-header>
</template>

<script>
import { IonHeader } from "@ionic/vue";
import { defineComponent } from "vue";
import Logout from "./Logout.vue";

export default defineComponent({
  name: "Header",
  components: {
    IonHeader,
    Logout,
  },
});
</script>