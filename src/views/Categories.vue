<template>
  <ion-page>
    <Header></Header>
    <Sub
      :title="this.$store.getters.getCurrentEvent.name"
      :showShopButton="true"
    ></Sub>

    <ion-content class="has-header" :fullscreen="true">
      <ion-grid v-if="loaded">
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
                <img
                  :src="categorie.plats[0].photo_url"
                  alt="img-categorie"
                  class="img"
                />
                <ion-card-subtitle>
                  <p>{{ categorie.libelle }}</p>
                </ion-card-subtitle>
              </router-link>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <Footer v-if="loaded" :showDetails="true"></Footer>
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

  data() {
    return {
      loaded: false,
    };
  },

  async ionViewWillEnter() {
    await this.$store.dispatch("getEventDetails");
    this.loaded = true;
  },
});
</script>

<style lang="scss" scoped>
ion-card {
  padding: 1em;
  text-align: center;
}
p {
  color: #7f2928;
  font-weight: bold;
}
img {
  border-radius: 5px;
  height: 120px;
  width: 120px;
}
.links {
  text-decoration: none;
}
</style>