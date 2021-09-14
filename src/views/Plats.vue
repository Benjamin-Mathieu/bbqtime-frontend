<template>
  <ion-page>
    <Header></Header>
    <Sub :title="this.$store.getters.getCurrentEvent.name + ' / '"></Sub>
    <ion-content :fullscreen="true">
      <div
        v-for="categorie in this.$store.state.eventDetails.categories"
        :key="categorie.id"
      >
        <ion-grid>
          <ion-row>
            <ion-col v-for="plat in categorie.plats" :key="plat.id" size="6">
              <ion-card
                v-if="plat.category_id == this.$route.params.idCategorie"
              >
                <img :src="plat.photo_url" alt="img-plat" />
                <ion-card-header>
                  <ion-card-title
                    >{{ plat.libelle }}
                    {{ plat.price + "€" }}
                  </ion-card-title>
                </ion-card-header>

                <ion-card-content>
                  {{ plat.description }}
                  <ion-item>
                    <ion-label position="floating">Quantité</ion-label>
                    <ion-input
                      type="number"
                      v-model.number="plat.qty"
                      min="1"
                      :max="plat.stock"
                    ></ion-input>
                  </ion-item>
                  <h3>stock: {{ plat.stock }}</h3>
                  <ion-progress-bar
                    :value="1 - plat.qty / plat.stock"
                    :color="color"
                  ></ion-progress-bar>
                  <ion-button
                    @click="addToShop(plat)"
                    size="small"
                    fill="outline"
                  >
                    Ajouter au panier
                    <ion-icon :icon="addCircleOutline"></ion-icon>
                  </ion-button>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
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
  IonProgressBar,
} from "@ionic/vue";
import { addCircleOutline } from "ionicons/icons";
import Sub from "../components/Sub.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

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
    IonProgressBar,
    Sub,
    Header,
    Footer,
  },
  setup() {
    return {
      addCircleOutline,
    };
  },
  data() {
    return {
      quantity: 1,
      color: "primary",
      total: 0,
    };
  },
  mounted() {
    this.$store.dispatch("getEventDetails", this.$route.params.id);
  },
  computed: {},
  methods: {
    addToShop(addedPlat) {
      this.$store.commit("setShop", addedPlat);
    },
  },
});
</script>

<style scoped>
</style>