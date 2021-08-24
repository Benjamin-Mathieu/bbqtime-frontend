<template>
  <h1>SignIn</h1>
  <form @submit.prevent="authUser()" method="post">
    <input v-model="email" type="text" placeholder="E-mail" required />
    <input
      v-model="password"
      type="password"
      placeholder="Mot de passe"
      required
    />
    <button type="submit">Connexion</button>
  </form>
</template>

<script>
import { defineComponent } from "vue";
import { Http } from "@capacitor-community/http";

export default defineComponent({
  name: "SignIn",
  data() {
    return {
      email: "testpost@gmail.com",
      password: "",
    };
  },
  methods: {
    authUser() {
      console.log(this.email, this.password);
      const options = {
        url: "http://localhost:3000/users/login",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        data: {
          email: this.email,
          password: this.password,
        },
      };

      const resp = Http.post(options)
        .then((resp) => console.log(resp.data))
        .catch((err) => console.log(err));
      return resp;
    },
  },
});
</script>

<style scoped>
</style>