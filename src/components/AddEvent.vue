<template>
  <form @submit.prevent="addEvent()" method="post">
    <input
      v-model="name"
      type="name"
      placeholder="Nom de l'évènement"
      required
    />
    <input v-model="password" type="password" placeholder="Mot de passe ?" />

    <button type="submit">Créer l'évènement</button>
  </form>
</template>

<script>
import { defineComponent } from "vue";
import { Http } from "@capacitor-community/http";
import QrCode from "../services/qrcode";
import popup from "../services/popup";

export default defineComponent({
  name: "AddEvent",
  data() {
    return {
      name: "",
      password: "",
    };
  },
  mounted() {},
  methods: {
    addEvent() {
      const options = {
        url: "http://localhost:3000/events",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        data: {
          name: this.name,
          password: this.password,
        },
      };

      Http.post(options)
        .then((resp) => {
          QrCode.generate(resp.data.id);
          popup.showPopUp("Evènement crée");
        })
        .catch((err) => console.log(err));
    },
  },
});
</script>