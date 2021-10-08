 <template>
  <ion-page>
    <Header></Header>
    <Sub title="Création de votre évènement"></Sub>
    <ion-content>
      <!-- ETAPES (1: Evènement, 2: Categorie + Menu, 3: Confirmation création évènement) -->
      <ion-segment :value="this.$store.state.events.currentStep">
        <ion-segment-button
          @click="this.$store.state.events.currentStep = 1"
          :disabled="disabledStep1"
          value="1"
        >
          <ion-label>1</ion-label>
        </ion-segment-button>
        <ion-segment-button
          @click="this.$store.state.events.currentStep = 2"
          value="2"
          :disabled="disabledStep2"
        >
          <ion-label>2</ion-label>
        </ion-segment-button>
        <ion-segment-button
          @click="this.$store.state.events.currentStep = 3"
          value="3"
          :disabled="disabledStep3"
        >
          <ion-label>3</ion-label>
        </ion-segment-button>
      </ion-segment>

      <!-- STEP 1 -->
      <FormEvent v-if="this.$store.state.events.currentStep === 1"></FormEvent>

      <!-- STEP 2 -->
      <div class="step2" v-if="this.$store.state.events.currentStep === 2">
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
        <ion-button @click="validEvent()">Terminer</ion-button>
      </div>

      <!-- STEP 3 -->
      <div v-if="this.$store.state.events.currentStep === 3" class="step3">
        <ion-card>
          <ion-card-title>L'évènement a été crée !</ion-card-title>
          <ion-card-subtitle>
            Inviter des personnes à votre évènement
          </ion-card-subtitle>
          <ion-card-content>
            <ion-item>
              <ion-input
                :placeholder="this.$store.state.events.eventTmp.password"
                readonly="true"
                color="danger"
              ></ion-input>
            </ion-item>

            <ion-button size="small" @click="shareEvent()">
              <ion-icon slot="end" :icon="shareSocial"></ion-icon>
              <ion-label>Partager le lien</ion-label>
            </ion-button>
            <ion-button
              size="small"
              @click="this.formMailing = !this.formMailing"
            >
              <ion-icon slot="end" :icon="mailOutline"></ion-icon>
              <ion-label>Envoyer mail</ion-label>
            </ion-button>

            <FormMailing v-if="formMailing"></FormMailing>
          </ion-card-content>
        </ion-card>
      </div>
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
  IonItem,
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
  IonIcon,
  modalController,
  alertController,
} from "@ionic/vue";
import FormEvent from "../components/FormEvent.vue";
import FormCategorie from "../components/FormCategorie.vue";
import FormMenu from "../components/FormMenu.vue";
import Sub from "../components/Sub.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { Share } from "@capacitor/share";
import { mailOutline, shareSocial } from "ionicons/icons";
import FormMailing from "../components/FormMailing.vue";

export default defineComponent({
  name: "AddEvent",
  components: {
    IonContent,
    IonPage,
    IonSegment,
    IonSegmentButton,
    IonItem,
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
    IonIcon,
    FormEvent,
    FormMailing,
    Sub,
    Header,
    Footer,
  },

  setup() {
    return {
      mailOutline,
      shareSocial,
    };
  },
  data() {
    return {
      toggleForm: "categorie",
      disabledMenu: true,
      disabledStep1: false,
      disabledStep2: true,
      disabledStep3: true,
      formMailing: false,
    };
  },
  ionViewWillEnter() {
    this.$store.commit("setCurrentStep", 1);
  },
  ionViewDidLeave() {
    this.$store.commit("setEventTmp", {});
  },
  watch: {
    "$store.state.events.currentStep": function (step) {
      switch (step) {
        case 2:
          this.disabledStep2 = false;
          break;
        case 3:
          this.disabledStep1 = true;
          this.disabledStep2 = true;
          break;
        default:
          this.$store.commit("setEventTmp", 1);
      }
    },
  },
  methods: {
    addPlatToCategorie(idCategorie) {
      this.toggleForm = "menu";
      this.$store.commit("setCategoryIdTmp", idCategorie);
      this.$store.dispatch("getPlats");
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
        this.$store.state.events.currentStep = 3;
      }
    },

    async shareEvent() {
      const event = this.$store.state.events.eventTmp;
      await Share.share({
        title: "Invitation à un évènement",
        text: `Je t'invite à rejoindre mon évènement sur l'application BBQ Time via le mot de passe: ${event.password}`,
        dialogTitle: "Partagez votre évènement",
      });
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