<template>
  <ion-page>
    <Header></Header>
    <Sub></Sub>
    <ion-content>
      <ion-card>
        <ion-card-subtitle>
          Réinitialisation du mot de passe
        </ion-card-subtitle>
        <ion-card-content>
          <form
            v-if="showFormSendCode"
            @submit.prevent="sendCode()"
            method="post"
          >
            <ion-input
              v-model="email"
              type="email"
              placeholder="Saisir votre adresse mail"
              required
            ></ion-input>
            <ion-button
              type="submit"
              size="small"
              :disabled="disabledFormSendCode"
              >Envoyer le code</ion-button
            >
          </form>

          <form
            v-if="showFormVerifCode"
            @submit.prevent="verifCode()"
            method="post"
          >
            <ion-input
              v-model.number="code"
              type="number"
              placeholder="Saisir code"
              required
            ></ion-input>
            <ion-button
              type="submit"
              size="small"
              :disabled="disabledFormVerifCode"
              >Valider</ion-button
            >
          </form>

          <form
            v-if="showFormResetPassword"
            @submit.prevent="resetPassword()"
            method="post"
          >
            <ion-item>
              <ion-label position="floating">Nouveau mot de passe</ion-label>
              <ion-input
                v-model="password"
                type="password"
                placeholder="Saisir nouveau mot de passe"
                required
              ></ion-input>
            </ion-item>

            <ion-item>
              <ion-label position="floating">Saisir à nouveau</ion-label>
              <ion-input
                v-model="checkpwd"
                type="password"
                placeholder="Saisir nouveau mot de passe"
                required
              ></ion-input>
            </ion-item>

            <ion-button type="submit" size="small">
              Changer mot de passe
            </ion-button>
          </form>
        </ion-card-content>
      </ion-card>
    </ion-content>
    <Footer></Footer>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardSubtitle,
  IonCardContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import Header from "../components/Header.vue";
import Sub from "../components/Sub.vue";
import Footer from "../components/Footer.vue";

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonCardSubtitle,
    IonCardContent,
    IonInput,
    IonButton,
    IonItem,
    IonLabel,
    Header,
    Sub,
    Footer,
  },
  name: "ResetPassword",
  data() {
    return {
      email: "ben-88200@hotmail.fr",
      code: "",
      password: "",
      checkpwd: "",
      disabledFormSendCode: false,
      disabledFormVerifCode: false,
      showFormSendCode: true,
      showFormVerifCode: false,
      showFormResetPassword: false,
    };
  },
  methods: {
    async sendCode() {
      this.$store.commit("setResetPassword", { email: this.email });
      const mailIsend = await this.$store.dispatch("sendCode");
      console.log("return mailIsSend =>", mailIsend);
      if (mailIsend) {
        this.disabledFormSendCode = true;
        this.showFormVerifCode = true;
      }
    },
    async verifCode() {
      await this.$store.dispatch("verifCode", this.code);
      this.disabledFormVerifCode = true;
      this.showFormResetPassword = true;
    },

    async resetPassword() {
      if (this.password !== this.checkpwd) {
        alert("Mot de passe ne correspondent pas");
      } else {
        await this.$store.dispatch("resetPassword", this.checkpwd);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
</style>