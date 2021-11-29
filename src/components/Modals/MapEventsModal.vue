<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Evènements publics</ion-title>
      <ion-button slot="end" fill="clear" @click="closeModal()">
        <ion-icon name="close"></ion-icon>
      </ion-button>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <div id="events-map">
      <div class="locate-button">
        <ion-button @click.stop="locate()" fill="solid" size="large">
          <ion-icon :icon="locateSharp"></ion-icon>
        </ion-button>
      </div>
      <div class="spinner">
        <ion-spinner color="primary"></ion-spinner>
      </div>
    </div>
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
import MapEvents from "../../services/mapEvents";
import { locateSharp } from "ionicons/icons";

export default defineComponent({
  name: "MapEventsModal",
  components: {
    IonHeader,
    IonToolbar,
    IonContent,
    IonTitle,
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
    MapEvents.openMap();
    console.log("inmounted");
  },

  unmounted() {
    MapEvents.initMap();
  },

  methods: {
    closeModal() {
      modalController.dismiss();
    },

    locate() {
      MapEvents.centerMapOnUserPosition();
    },
  },
});
</script>

<style lang="scss" scoped>
#events-map {
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