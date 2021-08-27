<template>
  <ion-button @click="logoutUser">Se déconnecter</ion-button>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Logout",
  methods: {
    logoutUser() {
      localStorage.clear();
      this.$store.commit("setUserIsLoggedIn", false);
      this.$store.commit("setToken", null);
      this.$store.commit("setUserInformation", null);
      this.$router.push("/home");
    },
  },
});
</script>