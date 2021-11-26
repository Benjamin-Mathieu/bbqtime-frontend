<template>
  <ion-fab horizontal="end" vertical="bottom" slot="fixed">
    <ion-fab-button @click="openMap()">
      <ion-icon :icon="mapOutline"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script>
import { IonFab, IonFabButton, IonIcon } from "@ionic/vue";
import { defineComponent } from "vue";
import { mapOutline } from "ionicons/icons";
import ShowModal from "../Modals/ModalController";

export default defineComponent({
  name: "OpenMapButton",
  components: {
    IonFab,
    IonFabButton,
    IonIcon,
  },
  setup() {
    return {
      mapOutline,
    };
  },

  methods: {
    async openMap() {
      await this.$store.dispatch("getAllPublicEvents");
      await this.$store.dispatch("getCoordsPublicEvents");
      ShowModal.mapEvents();
    },
  },
});
</script>

<style lang="scss" scoped>
ion-toolbar {
  --min-height: 75px;
}
</style>