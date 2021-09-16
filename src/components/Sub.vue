<template>
  <ion-toolbar color="primary">
    <ion-buttons slot="start">
      <ion-button @click="this.$router.go(-1)">
        <ion-icon :icon="chevronBackOutline"></ion-icon>
      </ion-button>
    </ion-buttons>
    <ion-title :title="title">{{ title }}</ion-title>
    <ion-buttons slot="end">
      <ion-menu-button menu="end" color="dark">
        <ion-icon :icon="bagHandle" style="width: 50px"></ion-icon>
      </ion-menu-button>
      <ion-badge color="primary">{{
        this.$store.getters.getNumberItemInShop
      }}</ion-badge>
    </ion-buttons>
  </ion-toolbar>
</template>

<script>
import {
  IonToolbar,
  IonButtons,
  IonButton,
  IonMenuButton,
  IonTitle,
  IonIcon,
  IonBadge,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { chevronBackOutline, bagHandle } from "ionicons/icons";

export default defineComponent({
  name: "Header",
  props: {
    title: {
      type: String,
    },
  },
  components: {
    IonToolbar,
    IonButtons,
    IonButton,
    IonMenuButton,
    IonTitle,
    IonIcon,
    IonBadge,
  },
  setup() {
    return {
      chevronBackOutline,
      bagHandle,
    };
  },
});
</script>