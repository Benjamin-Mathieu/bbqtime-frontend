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
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import { IonCard, IonCardContent, IonItem, IonButton } from "@ionic/vue";

export default defineComponent({
  name: "Account",
  components: {
    IonCard,
    IonCardContent,
    IonItem,
    IonButton,
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