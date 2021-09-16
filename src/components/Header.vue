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
        <ion-button size="large" color="dark">
          <ion-icon :icon="personCircleOutline"></ion-icon>
        </ion-button>
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