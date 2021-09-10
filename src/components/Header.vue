<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button menu="start"></ion-menu-button>
      </ion-buttons>
      <ion-title>
        <img src="../../public/assets/logo1.png" alt="logo-bbqtime" />
      </ion-title>
      <ion-buttons slot="end">
        <ion-menu-button menu="end"></ion-menu-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script>
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
  components: {
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
  },
});
</script>