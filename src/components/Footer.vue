<template>
  <ion-footer>
    <ion-toolbar color="primary">
      <ion-grid v-if="Object.keys(this.$store.state.eventDetails).length > 0">
        <ion-row>
          <ion-col size="6"
            >Adresse: {{ this.$store.state.eventDetails.address }}</ion-col
          >
          <ion-col size="6"
            >Date: {{ this.$store.state.eventDetails.date }}</ion-col
          >
        </ion-row>
      </ion-grid>
    </ion-toolbar>
  </ion-footer>
</template>

<script>
import { IonFooter, IonToolbar, IonGrid, IonRow, IonCol } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
  components: {
    IonFooter,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol,
  },
});
</script>

<style lang="scss" scoped>
</style>