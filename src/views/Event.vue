<template>
  <h1>Evènements</h1>

  <div v-for="event in this.$store.state.events" :key="event.id">
    <div>
      <p>NOM => {{ event.name }} ID => {{ event.id }}</p>
    </div>
  </div>

  <AddEvent></AddEvent>
</template>

<script>
import { defineComponent } from "vue";
import AddEvent from "../components/AddEvent.vue";
// import APIProvider from "../services/api";

export default defineComponent({
  name: "Event",
  components: { AddEvent },
  mounted() {
    this.$store.dispatch("getEvents");
  },
});
</script>

<style scoped>
</style>