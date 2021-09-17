 <template>
  <ion-page>
    <Header></Header>
    <Sub title="Création de votre évènement"></Sub>
    <ion-content>
      <!-- ETAPES (1: Evènement, 2: Categorie + Menu, 3: Paiement, 4: Confirmation création évènement) -->
      <ion-segment class="steps" :value="step">
        <ion-segment-button @click="step = 1" value="1">
          <ion-label>1</ion-label>
        </ion-segment-button>
        <ion-segment-button @click="step = 2" value="2" :disabled="disabled">
          <ion-label>2</ion-label>
        </ion-segment-button>
        <ion-segment-button @click="step = 3" value="3" :disabled="disabled">
          <ion-label>3</ion-label>
        </ion-segment-button>
        <ion-segment-button @click="step = 4" value="4" :disabled="disabled">
          <ion-label>4</ion-label>
        </ion-segment-button>
      </ion-segment>

      <!-- STEP 1 -->
      <FormEvent v-if="step === 1"></FormEvent>

      <!-- STEP 2 -->
      <ion-content v-if="step === 2">
        <ion-segment :value="toggleForm">
          <ion-segment-button
            @click="toggleForm = 'categorie'"
            value="categorie"
          >
            <ion-label>Catégorie</ion-label>
          </ion-segment-button>
          <ion-segment-button
            @click="toggleForm = 'menu'"
            value="menu"
            :disabled="disabledMenu"
          >
            <ion-label>Plats</ion-label>
          </ion-segment-button>
        </ion-segment>

        <ion-button
          @click="openModalCategorie"
          v-if="toggleForm === 'categorie'"
          >Ajouter une catégorie</ion-button
        >
        <ion-button @click="openModalMenu" v-else>Ajouter un plat</ion-button>

        <ion-grid v-if="toggleForm === 'categorie'">
          <ion-row>
            <ion-col
              v-for="categorie in this.$store.state.categories"
              :key="categorie.id"
              size="6"
              @click="addPlatToCategorie(categorie.id)"
            >
              <ion-card>
                <img :src="categorie.photo_url" alt="img-categorie" />
                <ion-card-header>
                  <ion-card-title> {{ categorie.libelle }} </ion-card-title>
                </ion-card-header>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>

        <ion-grid v-if="toggleForm === 'menu'">
          <ion-row>
            <ion-col
              v-for="plat in this.$store.state.plats"
              :key="plat.id"
              size="6"
            >
              <ion-card>
                <img :src="plat.photo_url" alt="img-plat" />
                <ion-card-header>
                  <ion-card-title> {{ plat.libelle }} </ion-card-title>
                </ion-card-header>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-content>

      <ion-button @click="nextStep()">Suivant</ion-button>
    </ion-content>
    <Footer></Footer>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonContent,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonButton,
  IonCard,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonCardHeader,
  modalController,
  alertController,
} from "@ionic/vue";
import FormEvent from "../components/FormEvent.vue";
import FormCategorie from "../components/FormCategorie.vue";
import FormMenu from "../components/FormMenu.vue";
import Sub from "../components/Sub.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default defineComponent({
  name: "AddEvent",
  components: {
    IonContent,
    IonPage,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonButton,
    IonCard,
    IonCardTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonCardHeader,
    FormEvent,
    Sub,
    Header,
    Footer,
  },
  data() {
    return {
      step: 1,
      toggleForm: "categorie",
      disabled: true,
      disabledMenu: true,
    };
  },
  methods: {
    addPlatToCategorie(categorieId) {
      this.toggleForm = "menu";
      this.$store.commit("setCategoryIdTmp", categorieId);
      this.$store.dispatch("getPlats");
    },
    nextStep() {
      this.step++;

      if (this.step === 2) {
        this.$store.dispatch("getCategories");
      }
      if (this.step === 3) {
        this.validEvent();
      }
    },

    async openModalCategorie() {
      const modal = await modalController.create({
        component: FormCategorie,
      });
      return modal.present();
    },

    async openModalMenu() {
      const modal = await modalController.create({
        component: FormMenu,
      });
      return modal.present();
    },

    async validEvent() {
      const alert = await alertController.create({
        subHeader: "Avez-vous terminé ?",
        buttons: [
          {
            text: "Retour",
            role: "cancel",
          },
          {
            text: "Valider",
            role: "valid",
          },
        ],
      });
      await alert.present();

      const { role } = await alert.onDidDismiss();
      console.log("onDidDismiss resolved with role", role);
      if (role === "valid") {
        this.step = 3;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.isInactive {
  display: none;
}

.steps {
  ion-segment-button {
    --background-checked: #9c544d;
    --color-checked: #d7b59d;
  }
}
</style>