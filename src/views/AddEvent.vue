 <template>
  <ion-page>
    <Header></Header>
    <Sub title="Création de votre évènement"></Sub>
    <ion-content>
      <!-- ETAPES (1: Evènement, 2: Categorie + Menu, 3: Paiement, 4: Confirmation création évènement) -->
      <ion-segment>
        <ion-segment-button @click="currentStep = 1" value="1">
          <ion-label>1</ion-label>
        </ion-segment-button>
        <ion-segment-button @click="currentStep = 2" value="2">
          <ion-label>2</ion-label>
        </ion-segment-button>
        <ion-segment-button @click="currentStep = 3" value="3">
          <ion-label>3</ion-label>
        </ion-segment-button>
        <ion-segment-button @click="currentStep = 4" value="4">
          <ion-label>4</ion-label>
        </ion-segment-button>
      </ion-segment>

      <!-- STEP 1 -->
      <FormEvent v-if="currentStep === 1"></FormEvent>

      <!-- STEP 2 -->
      <div class="step2" v-if="currentStep === 2">
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
                  <ion-card-subtitle>
                    {{ plat.libelle }} {{ plat.price + " €" }}
                  </ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                  Description: {{ plat.description }} Stock: {{ plat.stock }}
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>

      <!-- STEP 3 -->
      <div v-if="currentStep === 3" class="step3">
        <ion-card>
          <ion-item>
            <ion-label position="floating">
              Numéro de compte de l'évènement
            </ion-label>
            <ion-input placeholder="Numéro de compte" required></ion-input>
          </ion-item>
          <ion-list>
            <ion-list-header>Moyen de paiement:</ion-list-header>
            <ion-item lines="none">
              <ion-label>Carte bancaire:</ion-label>
              <ion-checkbox color="primary" checked slot="end"></ion-checkbox>
            </ion-item>
            <ion-item lines="none">
              <ion-label>Espèce:</ion-label>
              <ion-checkbox color="primary" checked slot="end"></ion-checkbox>
            </ion-item>
            <ion-item lines="none">
              <ion-label>Visa:</ion-label>
              <ion-checkbox color="primary" slot="end"></ion-checkbox>
            </ion-item>
          </ion-list>
          <ion-item>
            <p>Recevoir les notifications d'inscriptions:</p>
            <ion-toggle color="primary"></ion-toggle>
          </ion-item>
        </ion-card>
      </div>

      <!-- STEP 4 -->
      <div v-if="currentStep === 4" class="step4">
        <ion-card>
          <ion-card-title>L'évènement a été crée !</ion-card-title>
          <ion-card-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
            risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
            nec, ultricies sed, dolor. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </ion-card-content>
        </ion-card>
        <ion-card>
          <ion-card-subtitle
            >Inviter des personnes à votre évènement</ion-card-subtitle
          >
          <ion-card-content>
            <ion-item>
              <ion-input
                :placeholder="this.$store.state.eventTmp.password"
                readonly="true"
                color="danger"
              ></ion-input>
            </ion-item>

            <ion-button size="small">Partager l'évènement</ion-button>
          </ion-card-content>
        </ion-card>
      </div>

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
  IonList,
  IonListHeader,
  IonItem,
  IonCheckbox,
  IonToggle,
  IonLabel,
  IonInput,
  IonButton,
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle,
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
    IonList,
    IonListHeader,
    IonItem,
    IonCheckbox,
    IonToggle,
    IonLabel,
    IonInput,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardSubtitle,
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
      currentStep: 1,
      toggleForm: "categorie",
      disabledMenu: true,
    };
  },
  watch: {
    currentStep() {
      switch (this.currentStep) {
        case 1:
          console.log(this.currentStep);
          break;
        case 2:
          console.log(this.currentStep);
          break;
        case 3:
          console.log(this.currentStep);
          break;
        case 4:
          console.log(this.currentStep);
          break;
      }
    },
  },
  methods: {
    addPlatToCategorie(idCategorie) {
      console.log(typeof idCategorie);
      this.toggleForm = "menu";
      this.$store.commit("setCategoryIdTmp", idCategorie);
      this.$store.dispatch("getPlats");
    },
    nextStep() {
      this.currentStep++;
      if (this.currentStep === 3) {
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
        this.currentStep = 3;
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