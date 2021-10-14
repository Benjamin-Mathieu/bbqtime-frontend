<template>
  <ion-toolbar color="primary">
    <ion-buttons slot="start">
      <ion-button @click="this.$router.back()">
        <ion-icon :icon="chevronBackOutline"></ion-icon>
      </ion-button>
    </ion-buttons>
    <ion-title :title="title">{{ title }}</ion-title>
    <ion-buttons
      v-if="showShopButton"
      :showShopButton="showShopButton"
      slot="end"
    >
      <ion-menu-button menu="end" color="dark">
        <ion-icon :icon="bagHandle" style="width: 50px"></ion-icon>
      </ion-menu-button>
      <div class="numberItemsInShop">
        {{ this.$store.getters.getNumberItemInShop }}
      </div>
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
} from "@ionic/vue";
import { defineComponent } from "vue";
import { chevronBackOutline, bagHandle } from "ionicons/icons";

export default defineComponent({
  name: "Header",
  props: {
    title: {
      type: String,
    },
    showShopButton: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    IonToolbar,
    IonButtons,
    IonButton,
    IonMenuButton,
    IonTitle,
    IonIcon,
  },
  setup() {
    return {
      chevronBackOutline,
      bagHandle,
    };
  },
});
</script>

<style lang="scss" scoped>
ion-icon,
ion-title {
  color: #d7b59d;
}
.numberItemsInShop {
  background-color: #d7b59d;
  border-radius: 50%;
  padding: 0em 0.3em;
  position: relative;
  left: -10px;
  top: -10px;
  color: #7f2928;
  font-weight: bold;
}
</style>