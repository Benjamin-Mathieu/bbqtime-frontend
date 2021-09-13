<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <h1>Categories</h1>
      <h1>Categories</h1>

      <ion-grid>
        <ion-row>
          <ion-col
            v-for="categorie in this.$store.state.eventDetails.categories"
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
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  // IonCardContent,
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
    // IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
  },
  mounted() {
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