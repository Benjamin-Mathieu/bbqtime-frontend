<template>
  <h1>Evènements</h1>
  <ion-button href="/add-event">Créer un évènement</ion-button>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Event",
  mounted() {
    this.$store.dispatch("getEvents");
  },
});
</script>

<style scoped>
</style>