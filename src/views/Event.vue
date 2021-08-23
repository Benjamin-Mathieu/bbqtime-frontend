<template>
  <h1>Event</h1>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Event",
  mounted() {
    console.log("test");

    // this.$axios
    //   .get("/events", {})
    //   .then((response) => {
    //     console.log(response.data); //contenu des data
    //   })
    //   .catch((error) => {
    //     alert(error.response.data); //Contenu de de l'erreur
    //   });
  },
});
</script>

<style scoped>
</style>