<template>
  <ion-page>
    <Header></Header>
    <Sub title="Mon compte"></Sub>
    <ion-content>
      <form @submit.prevent="updateProfile()" method="post">
        <ion-card>
          <ion-card-content
            ><ion-item>
              <ion-input type="text" placeholder="Prénom"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input type="text" placeholder="Nom"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input type="text" placeholder="Téléphone"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input type="text" placeholder="Code postal"></ion-input>
            </ion-item>
            <ion-item>
              <ion-input type="email" placeholder="Email"></ion-input>
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
            <ion-icon size="large" :icon="calendarOutline"> </ion-icon>
          </ion-button>
        </router-link>

        <router-link :to="{ name: 'Orders' }"
          ><ion-button>
            <ion-icon size="large" :icon="bagOutline"></ion-icon> </ion-button
        ></router-link>

        <router-link :to="{ name: 'Settings' }"
          ><ion-button>
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
  justify-content: space-around;
}
</style>