<template>
  <ion-page>
    <Header></Header>
    <Sub title="Créer un compte"></Sub>
    <ion-content>
      <form @submit.prevent="registerUser()" method="post">
        <ion-card>
          <ion-grid>
            <ion-row>
              <ion-col size="6">
                <ion-item lines="none">
                  <ion-label position="floating">Prénom</ion-label>
                  <ion-input
                    v-model="firstname"
                    type="text"
                    required
                  ></ion-input>
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
              <ion-col size="6">
                <ion-item lines="none">
                  <ion-label position="floating">Téléphone</ion-label>
                  <ion-input v-model="phone" type="text" required></ion-input>
                </ion-item>
              </ion-col>
              <ion-col size="6">
                <ion-item lines="none">
                  <ion-label position="floating">Code postal</ion-label>
                  <ion-input v-model="zipcode" type="text" required></ion-input>
                </ion-item>
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-item lines="none">
                <ion-label position="floating">E-mail</ion-label>
                <ion-input v-model="email" type="email" required></ion-input>
              </ion-item>
            </ion-row>
            <ion-row :class="classObject">
              <ion-item>
                <ion-label position="floating">Mot de passe</ion-label>
                <ion-input
                  v-model="password"
                  type="password"
                  required
                ></ion-input> </ion-item
            ></ion-row>
            <ion-row :class="classObject">
              <ion-item>
                <ion-label position="floating"
                  >Vérifier le mot de passe</ion-label
                >
                <ion-input
                  v-model="checkPassword"
                  type="password"
                  required
                ></ion-input>
              </ion-item>
            </ion-row>
          </ion-grid>
          <ion-button type="submit">Créer le compte</ion-button>
        </ion-card>
      </form>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonPage,
  IonContent,
  IonCard,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from "@ionic/vue";
import Sub from "../components/Sub.vue";
import Header from "../components/Header.vue";

export default defineComponent({
  name: "SignUp",
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    Sub,
    Header,
  },
  data() {
    return {
      email: "postfe@gmail.com",
      password: "",
      checkPassword: "",
      name: "Christopher",
      firstname: "Wallace",
      phone: "0325142365",
      zipcode: "88200",
      isChecked: true,
      noMatch: true,
    };
  },
  computed: {
    classObject() {
      if (
        this.password == this.checkPassword &&
        this.password !== "" &&
        this.checkPassword !== ""
      ) {
        return { checkPassword: this.isChecked };
      } else {
        return { noMatch: this.noMatch };
      }
    },
  },
  methods: {
    registerUser() {
      if (this.password !== this.checkPassword) {
        this.isChecked = false;
        alert("Mot de passe ne correspond pas");
      } else {
        const newUser = {
          email: this.email,
          password: this.password,
          name: this.name,
          firstname: this.firstname,
          phone: this.phone,
          zipcode: this.zipcode,
        };
        this.$store.commit("setUserTmp", newUser);
        this.$store.dispatch("registerUser");
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.checkPassword {
  ion-item {
    --border-color: green;
    --color: green;
  }
}
.noMatch {
  ion-item {
    --border-color: red;
    --color: red;
  }
}
</style>