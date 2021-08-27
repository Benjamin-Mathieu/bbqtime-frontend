<template>
  <h1>Evènements</h1>

  <ion-button href="/add-event">Créer un évènement</ion-button>
</template>

<script>
import { defineComponent } from "vue";
import APIProvider from "../services/api";

export default defineComponent({
  name: "Event",
  mounted() {
    APIProvider.getEvents();
  },
});
</script>

<style scoped>
</style>