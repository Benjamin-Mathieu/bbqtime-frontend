<template>
  <h1>Categorie</h1>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Categorie",
  mounted() {
    this.$store.dispatch("getCategories");
  },
});
</script>

<style scoped>
</style>