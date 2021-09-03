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
              <img :src="plat.photo_url" alt="img-plat" />
              <ion-card-header>
                <ion-card-title
                  >{{ plat.libelle }} {{ plat.price + "€" }}</ion-card-title
                >
              </ion-card-header>

              <ion-card-content>
                {{ plat.description }}
                <ion-item>
                  <ion-label position="floating">Quantité</ion-label>
                  <ion-input type="number" v-model="quantity"></ion-input>
                </ion-item>
                <ion-button size="small" fill="outline">
                  <ion-icon :icon="addCircleOutline"></ion-icon>
                </ion-button>
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
  IonItem,
  IonInput,
  IonLabel,
  IonCardTitle,
  IonIcon,
  IonButton,
} from "@ionic/vue";
import { addCircleOutline } from "ionicons/icons";

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
    IonItem,
    IonInput,
    IonLabel,
    IonCardTitle,
    IonIcon,
    IonButton,
  },
  setup() {
    return {
      addCircleOutline,
    };
  },
  data() {
    return {
      quantity: 1,
    };
  },
  mounted() {
    this.$store.dispatch("getEventDetails", this.$route.params.id);
  },
});
</script>

<style scoped>
</style>