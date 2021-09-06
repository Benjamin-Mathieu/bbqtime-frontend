<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <h1>Categories</h1>
      <h1>Categories</h1>

      <ion-grid>
        <ion-row>
          <ion-col
            v-for="plat in this.$store.state.eventDetails.plats"
            :key="plat.id"
            size="6"
          >
            <ion-card>
              <img :src="plat.photo_url" alt="img-categorie" />
              <ion-card-header>
                <ion-card-title></ion-card-title>
              </ion-card-header>

              <ion-card-content>
                {{ plat.categorie.libelle }}
                <router-link
                  :to="
                    '/event/' +
                    plat.event_id +
                    '/categories/' +
                    plat.categorie.id
                  "
                  ><ion-button fill="outline" slot="end" size="small"
                    >Voir plats</ion-button
                  ></router-link
                >
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";

export default defineComponent({
  name: "Categories",
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
  },
  mounted() {
    // APIProvider.getCategories();
    console.log(this.$route.params.id);
    this.$store.dispatch("getEventDetails", this.$route.params.id);
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