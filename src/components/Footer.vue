<template>
  <ion-footer>
    <ion-toolbar color="primary">
      <ion-grid v-if="showDetails" :showDetails="showDetails">
        <ion-row>
          <ion-col size="6">
            <b>Adresse :</b>
            <p>{{ this.$store.state.events.eventDetails.address + "," }}</p>
            <p>
              {{
                this.$store.state.events.eventDetails.zipcode +
                " " +
                this.$store.state.events.eventDetails.city
              }}
            </p>
          </ion-col>
          <ion-col size="6">
            <b>Date :</b>
            <p>{{ this.date }}</p>
            <b>Heure: </b>
            <p>{{ this.$store.getters.getDateEvent.hours }}</p>
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
  computed: {
    date() {
      const dateEvent = new Date(this.$store.state.events.eventDetails.date);
      const date = dateEvent.getDate();
      const month = dateEvent.getMonth();
      const year = dateEvent.getFullYear();

      return `${date}/${month}/${year}`;
      // const options = {
      //   year: "numeric",
      //   month: "long",
      //   day: "numeric",
      // };
      // return new Intl.DateTimeFormat("fr-FR", options).format(dateEvent);
    },
  },
});
</script>

<style lang="scss" scoped>
p,
b {
  color: #d7b59d;
  margin-top: 0px;
}
</style>