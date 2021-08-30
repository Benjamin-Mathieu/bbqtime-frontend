<template>
  <h1>Commandes</h1>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Order",
  mounted() {
    this.$store.dispatch("getOrders");
  },
});
</script>

<style scoped>
</style>