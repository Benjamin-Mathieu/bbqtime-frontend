<template>
  <ion-page>
    <Header></Header>
    <Sub :showShopButton="true" title="Évènements"></Sub>
    <ion-content>
      <router-link :to="{ name: 'AddEvent' }">
        <ion-button size="small" slot="end">Ajouter un évènement</ion-button>
      </router-link>
      <ion-card v-for="event in this.$store.state.events" :key="event.id">
        <ion-grid>
          <ion-row>
            <ion-col size="2">
              <img
                alt="event-img"
                src="../../public/uploads/bbq.jpeg"
                style="object-fit: cover, height: 100%; width: 100%"
              />
            </ion-col>
            <ion-col size="10">
              <ion-item>
                <ion-label
                  ><b>{{ event.name }}</b></ion-label
                >
                <ion-icon v-if="event.private" :icon="lockClosed"></ion-icon>

                <router-link
                  :to="{ name: 'Categories', params: { id: event.id } }"
                >
                  <ion-button slot="end">Détails</ion-button>
                </router-link>
              </ion-item>

              <ion-card-content>
                <ion-item lines="none">
                  {{ event.description }}
                </ion-item>
                <ion-item lines="none">
                  <b>Localisation:</b>
                  {{ event.zipcode + " " + event.address + " " + event.city }}
                </ion-item>
                <div v-for="order in event.orders" :key="order.id">
                  <ion-item
                    v-if="
                      order.user_id == this.$store.getters.getUserInformation.id
                    "
                    detail
                    :detail-icon="checkmarkCircle"
                    lines="none"
                  >
                    <ion-label> Vous participez à cet évènement </ion-label>
                  </ion-item>
                </div>
              </ion-card-content>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card>
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
  IonIcon,
  IonItem,
  IonLabel,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import { lockClosed, checkmarkCircle } from "ionicons/icons";
import Header from "../components/Header.vue";
import Sub from "../components/Sub.vue";
import Footer from "../components/Footer.vue";

export default defineComponent({
  name: "Events",
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonCardContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    Header,
    Sub,
    Footer,
  },
  setup() {
    return {
      lockClosed,
      checkmarkCircle,
    };
  },
  ionViewWillEnter() {
    this.$store.dispatch("getEvents");
  },
});
</script>

<style lang="scss" scoped>
ion-card {
  margin: 1em auto;
}

ion-item {
  --detail-icon-color: green;
  --detail-icon-opacity: 0.7;
}
</style>