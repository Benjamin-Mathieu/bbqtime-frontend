<template>
  <ion-button @click="logoutUser">Se déconnecter</ion-button>
</template>

<script>
import { defineComponent } from "vue";
import { IonButton } from "@ionic/vue";

export default defineComponent({
  name: "Logout",
  components: { IonButton },
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