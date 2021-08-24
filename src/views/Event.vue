<template>
  <h1>Event</h1>
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