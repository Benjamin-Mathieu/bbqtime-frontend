<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <ion-toolbar>
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import { IonPage, IonContent, IonToolbar, IonTitle } from "@ionic/vue";
import APIProvider from "../services/api";

export default defineComponent({
  name: "Categorie",
  components: { IonPage, IonContent, IonToolbar, IonTitle },
  mounted() {
    APIProvider.getCategories();
  },
});
</script>

<style scoped>
#container {
  text-align: center;
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>