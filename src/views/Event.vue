<template>
  <h1>Event</h1>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Event",
  computed: {
    api() {
      return this.$store.state.api;
    },
  },
  mounted() {
    console.log("test");

    this.$store.dispatch("get");
  },
});
</script>

<style scoped>
</style>