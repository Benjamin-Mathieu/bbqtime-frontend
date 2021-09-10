<template>
  <ion-page>
    <ion-content>
      <h1>Mon compte</h1>
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
            <ion-button type="submit" slot="end" size="small"
              >Modifier</ion-button
            >
          </ion-item>
        </ion-card>
      </form>

      <router-link :to="{ name: 'MyEvents' }">
        <ion-button>
          <ion-icon size="large" :icon="calendarOutline"> </ion-icon>
        </ion-button>
      </router-link>

      <router-link :to="{ name: 'Orders' }"
        ><ion-button>
          <ion-icon size="large" :icon="bagOutline"></ion-icon> </ion-button
      ></router-link>

      <router-link :to="{ name: 'Orders' }"
        ><ion-button>
          <ion-icon
            size="large"
            :icon="settingsOutline"
          ></ion-icon> </ion-button
      ></router-link>
    </ion-content>
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
  },
  methods: {
    updateProfile() {
      alert("Update");
    },
  },
});
</script>
<style>
</style>