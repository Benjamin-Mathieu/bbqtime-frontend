<template>
  <ion-page>
    <Header></Header>
    <Sub title="Réinitialisation mot de passe"></Sub>
    <ion-content>
      <div id="container">
        <ion-card>
          <ion-card-header>
            <ion-card-title color="primary"
              >Mot de passe oublié ?</ion-card-title
            >
          </ion-card-header>
          <ion-card-content>
            <form
              v-if="showFormSendCode"
              @submit.prevent="sendCode()"
              method="post"
            >
              <ion-item>
                <ion-input
                  v-model="email"
                  type="email"
                  placeholder="Saisir votre adresse mail"
                  required
                ></ion-input>
              </ion-item>

              <div class="submit-buttons">
                <ion-button type="submit" size="small">Continuer</ion-button>
              </div>
            </form>

            <form
              v-if="showFormVerifCode"
              @submit.prevent="verifCode()"
              method="post"
            >
              <ion-input
                v-model.number="code"
                type="number"
                inputmode="numeric"
                placeholder="Saisir code"
                required
              ></ion-input>

              <div class="submit-buttons">
                <ion-button type="submit" size="small">Valider</ion-button>
              </div>
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

              <div class="submit-buttons">
                <ion-button type="submit" size="small"> Changer </ion-button>
              </div>
            </form>
          </ion-card-content>
        </ion-card>
      </div>
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
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import Header from "../components/Header.vue";
import Sub from "../components/Sub.vue";
import Footer from "../components/Footer.vue";
import popup from "../components/ToastController";

export default defineComponent({
  name: "ResetPassword",
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    IonInput,
    IonButton,
    IonItem,
    IonLabel,
    Header,
    Sub,
    Footer,
  },

  data() {
    return {
      email: "",
      code: "",
      password: "",
      checkpwd: "",
      showFormSendCode: true,
      showFormVerifCode: false,
      showFormResetPassword: false,
    };
  },

  methods: {
    async sendCode() {
      this.$store.commit("setResetPassword", { email: this.email });
      const mailIsend = await this.$store.dispatch("sendCode");
      if (mailIsend) {
        this.showFormSendCode = false;
        this.showFormVerifCode = true;
      }
    },

    async verifCode() {
      const success = await this.$store.dispatch("verifCode", this.code);
      if (success) {
        this.showFormVerifCode = false;
        this.showFormResetPassword = true;
      } else {
        this.code = "";
      }
    },

    resetPassword() {
      if (this.password !== this.checkpwd) {
        popup.warning("Les mots de passes saisies ne correspondent pas");
      } else {
        this.$store.dispatch("resetPassword", this.checkpwd);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
ion-card {
  --padding: 1em;
}

#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  .submit-buttons {
    margin-top: 1em;
  }
}
</style>