<template>
  <ion-footer>
    <ion-toolbar color="primary">
      <ion-grid v-if="showDetails" :showDetails="showDetails">
        <ion-row>
          <ion-col size="6"
            ><b>Adresse</b>
            {{
              `${this.$store.state.events.eventDetails.address} ${this.$store.state.events.eventDetails.zipcode} ${this.$store.state.events.eventDetails.city}`
            }}
          </ion-col>
          <ion-col size="6"
            ><b>Date :</b>
            {{ this.$store.getters.getDateEvent.date }}
            <b>Heure :</b>
            {{ this.$store.getters.getDateEvent.hours }}
          </ion-col>
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
  props: {
    showDetails: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
</style>