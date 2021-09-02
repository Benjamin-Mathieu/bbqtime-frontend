<template>
  <ion-page>
    <ion-content>
      <h1>SignUp</h1>
      <form @submit.prevent="registerUser()" method="post">
        <input v-model="email" type="email" placeholder="E-mail" required />
        <input
          v-model="password"
          type="password"
          placeholder="Mot de passe"
          required
        />
        <input v-model="name" type="text" placeholder="Nom" required />
        <input v-model="firstname" type="text" placeholder="Prénom" required />
        <input v-model="phone" type="text" placeholder="Mobile" required />

        <button type="submit">Créer un compte</button>
      </form>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import { Http } from "@capacitor-community/http";
import { IonPage, IonContent } from "@ionic/vue";

export default defineComponent({
  name: "SignUp",
  components: { IonPage, IonContent },
  data() {
    return {
      email: "postfe@gmail.com",
      password: "test",
      name: "Christopher",
      firstname: "Wallace",
      phone: "0325142365",
    };
  },
  methods: {
    registerUser() {
      const options = {
        url: "http://localhost:3000/users",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        data: {
          email: this.email,
          password: this.password,
          name: this.name,
          firstname: this.firstname,
          phone: this.phone,
        },
      };

      const resp = Http.post(options)
        .then((resp) => {
          console.log(resp);
        })
        .catch((err) => console.log(err));
      return resp;
    },
  },
});
</script>

<style scoped>
</style>