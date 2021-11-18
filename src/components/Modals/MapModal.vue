<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Lieu de l'évènement</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <div id="mapid">
      <div class="locate-button">
        <ion-button @click.stop="locate()" fill="solid" size="large">
          <ion-icon :icon="locateSharp"></ion-icon>
        </ion-button>
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
  },

  setup() {
    return {
      locateSharp,
    };
  },

  mounted() {
    Map.openMap();
  },

  methods: {
    locate() {
      Map.getMapOnUserPosition();
    },
  },
});
</script>

<style lang="scss" scoped>
#mapid {
  height: 100%;
  width: 100%;
  margin: auto;

  .locate-button {
    position: absolute;
    top: 1em;
    right: 1em;
    z-index: 1000;
  }
}
</style>