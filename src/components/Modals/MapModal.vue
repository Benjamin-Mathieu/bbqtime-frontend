<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Lieu de l'évènement</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <div id="mapid" v-if="this.$store.state.apiGouv.address"></div>
    <FormAddAddress></FormAddAddress>
  </ion-content>
</template>

<script>
import { defineComponent } from "vue";
import { IonHeader, IonToolbar, IonContent, IonTitle } from "@ionic/vue";
import FormAddAddress from "../Forms/FormAddAddress.vue";

export default defineComponent({
  name: "MapModal",
  components: {
    IonHeader,
    IonToolbar,
    IonContent,
    IonTitle,
    FormAddAddress,
  },
});
</script>

<style lang="scss" scoped>
#mapid {
  height: 100%;
  width: 100%;
  margin: auto;
}
</style>