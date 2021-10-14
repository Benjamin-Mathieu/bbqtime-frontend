<template>
  <ion-page>
    <Header></Header>
    <Sub
      :title="this.$store.getters.getCurrentEvent.name"
      :showShopButton="true"
    ></Sub>

    <ion-content class="has-header" :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col
            v-for="categorie in this.$store.state.events.eventDetails
              .categories"
            :key="categorie.id"
            size="6"
          >
            <ion-card>
              <router-link
                class="links"
                :to="
                  '/event/' + categorie.event_id + '/categorie/' + categorie.id
                "
              >
                <img :src="categorie.photo_url" alt="img-categorie" />
                <ion-card-subtitle>
                  {{ categorie.libelle }}
                </ion-card-subtitle>
              </router-link>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <Footer :showDetails="true"></Footer>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardSubtitle,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import Sub from "../components/Sub.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default defineComponent({
  name: "Categories",
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonCardSubtitle,
    IonGrid,
    IonRow,
    IonCol,
    Sub,
    Header,
    Footer,
  },
  ionViewWillEnter() {
    this.$store.dispatch("getEventDetails");
  },
});
</script>

<style scoped>
ion-card {
  padding: 1em;
  text-align: center;
}

img {
  margin-bottom: 1em;
}
.links {
  text-decoration: none;
}
</style>