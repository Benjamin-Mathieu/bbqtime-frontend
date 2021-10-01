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
            <router-link
              :to="
                '/event/' + categorie.event_id + '/categorie/' + categorie.id
              "
            >
              <ion-card>
                <img :src="categorie.photo_url" alt="img-categorie" />
                <ion-card-header>
                  <ion-card-title>
                    {{ categorie.libelle }}
                  </ion-card-title>
                </ion-card-header>
              </ion-card>
            </router-link>
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
  IonCardTitle,
  IonCardHeader,
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
    IonCardTitle,
    IonCardHeader,
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
.has-header {
  margin-top: 105px;
}
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