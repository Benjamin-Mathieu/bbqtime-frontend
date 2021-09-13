<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Lieu de l'évènement</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <form class="form" @submit.prevent="getAddress()">
      <ion-item>
        <ion-label position="floating">Adresse</ion-label>
        <ion-input type="text" v-model="address"></ion-input>
        <ion-button type="submit">Rechercher</ion-button>
      </ion-item>
    </form>
    <div id="mapid"></div>
  </ion-content>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import Map from "../services/map";

export default defineComponent({
  name: "MapModal",
  components: {
    IonHeader,
    IonToolbar,
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
  },
  data() {
    return {
      address: "",
    };
  },
  methods: {
    getAddress() {
      this.$store.commit("setAddress", this.address.replaceAll(" ", "+"));
      this.$store.dispatch("getAddress");
      Map.getMap();
    },
  },
});
</script>

<style lang="scss" scoped>
#mapid {
  height: 100%;
  width: 100%;
  margin: auto;
}

.form {
  position: absolute;
  z-index: 1000;
  width: 100%;
  bottom: 0;
}
</style>