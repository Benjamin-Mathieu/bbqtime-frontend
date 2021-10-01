<template>
  <ion-page>
    <Header></Header>
    <Sub title="Mon compte"></Sub>
    <ion-content>
      <form @submit.prevent="updateProfile()" method="post">
        <ion-card>
          <ion-card-content v-if="this.$store.getters.getUserInformation"
            ><ion-item>
              <ion-label position="floating">Prénom</ion-label>
              <ion-input
                type="text"
                :value="this.$store.getters.getUserInformation.name"
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Nom</ion-label>
              <ion-input
                type="text"
                :value="this.$store.getters.getUserInformation.firstname"
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Téléphone</ion-label>
              <ion-input
                type="text"
                :value="this.$store.getters.getUserInformation.phone"
                inputmode="tel"
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Code postale</ion-label>
              <ion-input
                type="text"
                :value="this.$store.getters.getUserInformation.zipcode"
                inputmode="decimal"
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Email</ion-label>
              <ion-input
                type="email"
                :value="this.$store.getters.getUserInformation.email"
                inputmode="email"
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-input
                type="password"
                placeholder="Mot de passe"
              ></ion-input> </ion-item
          ></ion-card-content>
          <ion-item>
            <ion-button type="submit" slot="end">Modifier</ion-button>
          </ion-item>
        </ion-card>
      </form>

      <div class="buttons">
        <router-link :to="{ name: 'MyEvents' }">
          <ion-button>
            <ion-label>Evènements </ion-label>
            <ion-icon size="large" :icon="calendarOutline"> </ion-icon>
          </ion-button>
        </router-link>

        <router-link :to="{ name: 'Orders' }"
          ><ion-button>
            <ion-label>Commandes </ion-label>
            <ion-icon size="large" :icon="bagOutline"></ion-icon> </ion-button
        ></router-link>

        <router-link :to="{ name: 'Settings' }"
          ><ion-button>
            <ion-label>Paramètres </ion-label>
            <ion-icon
              size="large"
              :icon="settingsOutline"
            ></ion-icon> </ion-button
        ></router-link>
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
import { settingsOutline, bagOutline, calendarOutline } from "ionicons/icons";
import Sub from "../components/Sub.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default defineComponent({
  name: "Account",
  setup() {
    return { settingsOutline, bagOutline, calendarOutline };
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
  methods: {
    updateProfile() {
      alert("Update");
    },
  },
});
</script>

<style lang="scss" scoped>
ion-card {
  margin: auto;
}

.buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>