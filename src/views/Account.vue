<template>
  <ion-page>
    <Header></Header>
    <Sub title="Mon compte"></Sub>
    <ion-content>
      <div id="container">
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
                <ion-input
                  type="text"
                  v-model="phone"
                  inputmode="tel"
                ></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="floating">Email</ion-label>
                <ion-input
                  type="email"
                  v-model="email"
                  inputmode="email"
                ></ion-input>
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
              <ion-button
                :disabled="disabledUpdateButton"
                type="submit"
                slot="end"
                >Modifier</ion-button
              >
            </ion-item>
          </ion-card>
        </form>

        <div class="buttons">
          <router-link :to="{ name: 'MyEvents' }">
            <ion-button>
              <ion-label>Mes évènements</ion-label>
              <ion-icon slot="end" :icon="calendarOutline"></ion-icon>
            </ion-button>
          </router-link>

          <router-link :to="{ name: 'Orders' }">
            <ion-button>
              <ion-label>Mes commandes</ion-label>
              <ion-icon slot="end" :icon="bagOutline"></ion-icon>
            </ion-button>
          </router-link>
        </div>
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
  IonCardContent,
  IonItem,
  IonButton,
  IonIcon,
  IonInput,
  IonLabel,
} from "@ionic/vue";
import { bagOutline, calendarOutline } from "ionicons/icons";
import Sub from "../components/Sub.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import popup from "../components/ToastController";

export default defineComponent({
  name: "Account",
  setup() {
    return { bagOutline, calendarOutline };
  },
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonCardContent,
    IonItem,
    IonButton,
    IonIcon,
    IonInput,
    IonLabel,
    Header,
    Sub,
    Footer,
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
        popup.error("Mauvais mot de passe !");
      }
    },
  },
});
</script>

<style lang="scss" scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.wrong-password {
  --border-color: red;
  --color: red;
}
</style>