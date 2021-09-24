<template>
  <ion-header>
    <ion-toolbar color="tertiary">
      <ion-buttons slot="start">
        <ion-menu-button menu="start" color="dark"></ion-menu-button>
      </ion-buttons>
      <ion-title>
        <img src="../../public/assets/logo1.png" alt="logo-bbqtime" />
      </ion-title>

      <ion-buttons slot="end">
        <router-link :to="{ name: 'Account' }">
          <ion-button size="large" color="dark">
            <ion-icon
              style="height: 32px; width: 32px"
              :icon="personCircleOutline"
            ></ion-icon>
          </ion-button>
        </router-link>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script>
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonMenuButton,
  IonTitle,
  IonIcon,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { personCircleOutline } from "ionicons/icons";

export default defineComponent({
  name: "Header",
  components: {
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonMenuButton,
    IonTitle,
    IonIcon,
  },
  setup() {
    return {
      personCircleOutline,
    };
  },
});
</script>

<style lang="scss" scoped>
ion-toolbar {
  --min-height: 75px;
}
</style>