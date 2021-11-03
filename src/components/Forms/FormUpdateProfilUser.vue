<template>
  <form @submit.prevent="updateProfil()" method="post">
    <ion-card>
      <ion-card-content v-if="this.$store.getters.getUserInformation"
        ><ion-item>
          <ion-label position="floating">Prénom</ion-label>
          <ion-input type="text" v-model="firstname"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Nom</ion-label>
          <ion-input type="text" v-model="name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Téléphone</ion-label>
          <ion-input type="text" v-model="phone" inputmode="tel"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input type="email" v-model="email" inputmode="email"></ion-input>
        </ion-item>
        <ion-item :class="{ 'wrong-password': pwdIsWrong }">
          <ion-input
            type="password"
            v-model="password"
            placeholder="Mot de passe"
          >
          </ion-input>
        </ion-item>
      </ion-card-content>
      <ion-item>
        <ion-button :disabled="disabledUpdateButton" type="submit" slot="end"
          >Modifier</ion-button
        >
      </ion-item>
    </ion-card>
  </form>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonLabel,
  IonItem,
  IonButton,
  IonInput,
  IonCard,
  IonCardContent,
} from "@ionic/vue";
import popup from "../ToastController";

export default defineComponent({
  name: "FormUpdateProfilUser",
  components: {
    IonLabel,
    IonItem,
    IonButton,
    IonInput,
    IonCard,
    IonCardContent,
  },

  data() {
    return {
      name: this.$store.getters.getUserInformation.name,
      firstname: this.$store.getters.getUserInformation.firstname,
      phone: this.$store.getters.getUserInformation.phone,
      email: this.$store.getters.getUserInformation.email,
      password: "",
      disabledUpdateButton: true,
      pwdIsWrong: false,
    };
  },

  watch: {
    password() {
      if (this.password !== "") {
        this.disabledUpdateButton = false;
      }
    },
  },

  methods: {
    async updateProfil() {
      const data = {
        name: this.name,
        firstname: this.firstname,
        phone: this.phone,
        email: this.email,
        password: this.password,
      };
      const isUpdated = await this.$store.dispatch("updateProfil", data);
      if (isUpdated) {
        this.pwdIsWrong = false;
        this.password = "";
      }

      if (isUpdated === false) {
        this.pwdIsWrong = true;
        popup.warning("Mot de passe incorrect !");
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.wrong-password {
  --border-color: red;
  --color: red;
}
</style>