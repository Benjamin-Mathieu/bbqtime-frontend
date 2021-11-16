<template>
  <form @submit.prevent="registerUser()" method="post">
    <ion-card>
      <ion-grid>
        <ion-row>
          <ion-col size="6">
            <ion-item lines="none">
              <ion-label position="floating">Prénom</ion-label>
              <ion-input v-model="firstname" type="text" required></ion-input>
            </ion-item>
          </ion-col>
          <ion-col size="6">
            <ion-item lines="none">
              <ion-label position="floating">Nom</ion-label>
              <ion-input v-model="name" type="text" required></ion-input>
            </ion-item>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-item lines="none">
            <ion-label position="floating">Téléphone</ion-label>
            <ion-input v-model="phone" type="text" required></ion-input>
          </ion-item>
        </ion-row>
        <ion-row>
          <ion-item lines="none">
            <ion-label position="floating">E-mail</ion-label>
            <ion-input v-model="email" type="email" required></ion-input>
          </ion-item>
        </ion-row>
        <ion-row :class="{ 'no-match': noMatch }">
          <ion-item>
            <ion-input
              :type="typeInputPassword"
              placeholder="Saisir mot de passe"
              v-model="password"
              required
            ></ion-input>
            <ion-button @click="show()" fill="clear" slot="end">
              <ion-icon :icon="icon"></ion-icon>
            </ion-button>
          </ion-item>
        </ion-row>
        <ion-row :class="{ 'no-match': noMatch }">
          <ion-item>
            <ion-input
              :type="typeInputPassword"
              placeholder="Saisir une 2ème fois"
              v-model="checkPassword"
              required
            ></ion-input>
            <ion-button @click="show()" fill="clear" slot="end">
              <ion-icon :icon="icon"></ion-icon>
            </ion-button>
          </ion-item>
        </ion-row>
      </ion-grid>
      <div class="signup-button">
        <ion-button :disabled="disabledButton" size="small" type="submit"
          >Créer le compte</ion-button
        >
      </div>
    </ion-card>
  </form>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonCard,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
} from "@ionic/vue";
import { eyeOutline, eyeOffOutline } from "ionicons/icons";
import popup from "../ToastController";

export default defineComponent({
  name: "FormSignUpUser",
  components: {
    IonCard,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
  },

  data() {
    return {
      email: "postfe@gmail.com",
      password: "",
      checkPassword: "",
      name: "Christopher",
      firstname: "Wallace",
      phone: "0325142365",
      noMatch: false,
      showPassword: false,
      typeInputPassword: "password",
      icon: eyeOutline,
      disabledButton: false,
    };
  },

  methods: {
    show() {
      this.showPassword = !this.showPassword;
      this.showPassword
        ? ((this.typeInputPassword = "password"), (this.icon = eyeOutline))
        : ((this.typeInputPassword = "text"), (this.icon = eyeOffOutline));
    },

    checkIfPasswordsMatches() {
      if (this.password !== this.checkPassword) {
        this.noMatch = true;
        popup.warning("Les mots de passes saisies ne correspondent pas !");
        return false;
      } else {
        return true;
      }
    },

    async registerUser() {
      this.disabledButton = true;
      const check = this.checkIfPasswordsMatches();

      if (check) {
        const newUser = {
          email: this.email,
          password: this.password,
          name: this.name,
          firstname: this.firstname,
          phone: this.phone,
        };

        this.$store.commit("setUserTmp", newUser);
        await this.$store.dispatch("registerUser");
        this.disabledButton = false;
      } else {
        this.disabledButton = false;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
ion-card {
  padding: 0.5em;

  ion-button {
    margin-top: 1em;
  }
}

.signup-button {
  text-align: right;
}

.no-match {
  ion-item {
    --border-color: red;
  }
}
</style>