<template>
  <form @submit.prevent="authUser()" method="post">
    <ion-card>
      <ion-card-content>
        <ion-item lines="none">
          <ion-label position="floating">E-mail</ion-label>
          <ion-input type="email" v-model="email" required></ion-input>
        </ion-item>
        <ion-item lines="none">
          <ion-input
            :type="typeInputPassword"
            placeholder="Mot de passe"
            v-model="password"
            required
            ref="inputPassword"
          ></ion-input>
          <ion-button @click="show()" fill="clear" slot="end">
            <ion-icon :icon="icon"></ion-icon>
          </ion-button>
        </ion-item>
        <router-link :to="{ name: 'ResetPassword' }">
          <ion-item lines="none">Mot de passe oublié ?</ion-item>
        </router-link>
        <div class="login-button">
          <ion-button size="small" :disabled="disabledButton" type="submit">
            Connexion
            <ion-spinner
              v-if="showSpinner === true"
              name="crescent"
            ></ion-spinner>
          </ion-button>
        </div>
        <!-- <SubmitButton
              callApi="loginUser"
              :payload="{ email: this.email, password: this.password }"
              text="Connexion"
            ></SubmitButton> -->
      </ion-card-content>
    </ion-card>
    <router-link :to="{ name: 'SignUp' }">
      <ion-button size="small"> Nouveau compte </ion-button>
    </router-link>
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
  IonIcon,
  IonCardContent,
  IonSpinner,
} from "@ionic/vue";
import { eyeOutline, eyeOffOutline } from "ionicons/icons";

export default defineComponent({
  name: "FormLoginUser",
  components: {
    IonLabel,
    IonItem,
    IonButton,
    IonInput,
    IonCard,
    IonIcon,
    IonCardContent,
    IonSpinner,
  },

  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      typeInputPassword: "password",
      icon: eyeOutline,
      disabledButton: false,
      showSpinner: false,
    };
  },

  methods: {
    async authUser() {
      this.disabledButton = true;
      this.showSpinner = true;
      const user = { email: this.email, password: this.password };
      await this.$store.dispatch("loginUser", user);
      this.disabledButton = false;
      this.showSpinner = false;
    },

    show() {
      this.showPassword = !this.showPassword;
      this.showPassword
        ? ((this.typeInputPassword = "password"), (this.icon = eyeOutline))
        : ((this.typeInputPassword = "text"), (this.icon = eyeOffOutline));
    },
  },
});
</script>

<style lang="scss" scoped>
.login-button {
  text-align: right;
}
</style>