<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Lieu de l'évènement</ion-title>
      <ion-button slot="end" fill="clear" @click="closeModal()">
        <ion-icon name="close"></ion-icon>
      </ion-button>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <div id="mapid">
      <div class="locate-button">
        <ion-button @click.stop="locate()" fill="solid" size="large">
          <ion-icon :icon="locateSharp"></ion-icon>
        </ion-button>
      </div>
      <div class="spinner">
        <ion-spinner color="primary"></ion-spinner>
      </div>
    </div>

    <FormAddAddress></FormAddAddress>
  </ion-content>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonIcon,
  IonButton,
  IonSpinner,
  modalController,
} from "@ionic/vue";
import FormAddAddress from "../Forms/FormAddAddress.vue";
import Map from "../../services/map";
import { locateSharp } from "ionicons/icons";

export default defineComponent({
  name: "MapModal",
  components: {
    IonHeader,
    IonToolbar,
    IonContent,
    IonTitle,
    FormAddAddress,
    IonIcon,
    IonButton,
    IonSpinner,
  },

  setup() {
    return {
      locateSharp,
    };
  },

  mounted() {
    Map.openMap();
  },

  unmounted() {
    Map.initMap();
  },

  methods: {
    closeModal() {
      modalController.dismiss();
    },

    locate() {
      Map.getMapOnUserPosition();
    },
  },
});
</script>

<style lang="scss" scoped>
#mapid {
  height: 100%;

  .spinner {
    position: absolute;
    z-index: 1000;
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 40%;
    transform: translateY(-50%) scale(1.5);
    display: block;
  }

  .locate-button {
    position: absolute;
    top: 1em;
    right: 1em;
    z-index: 1000;
  }
}
</style>