<template>
  <h1>SignIn</h1>
  <form @submit.prevent="authUser()" method="post">
    <ion-item>
      <ion-label position="floating">E-mail</ion-label>
      <ion-input type="email" v-model="email" required></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="floating">Mot de passe</ion-label>
      <ion-input type="password" v-model="password" required></ion-input>
    </ion-item>
    <ion-button type="submit">Connexion</ion-button>
  </form>
</template>

<script>
import { defineComponent } from "vue";
import { IonLabel, IonInput, IonItem } from "@ionic/vue";
import APIProvider from "../services/api";

export default defineComponent({
  components: { IonLabel, IonInput, IonItem },
  name: "SignIn",
  data() {
    return {
      email: "testpost@gmail.com",
      password: "",
    };
  },
  methods: {
    authUser() {
      APIProvider.loginUser(this.email, this.password);
    },
  },
});
</script>

<style scoped>
</style>