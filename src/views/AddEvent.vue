 <template>
  <ion-page>
    <Header></Header>
    <Sub title="Création de votre évènement"></Sub>
    <ion-content>
      <!-- ETAPES (1: Evènement, 2: Categorie + plat, 3: Confirmation création évènement) -->
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
        <ion-segment :value="toggleForm" @ionChange="selectedValue($event)">
          <ion-segment-button value="categorie">
            <ion-label>Catégorie</ion-label>
          </ion-segment-button>
          <ion-segment-button value="plat" :disabled="noCategory">
            <ion-label>Plat</ion-label>
          </ion-segment-button>
        </ion-segment>

        <ion-grid v-if="toggleForm === 'categorie'">
          <ion-button
            @click="openModalCategorie()"
            fill="outline"
            v-if="toggleForm === 'categorie'"
            >Ajouter catégorie</ion-button
          >
          <ion-row>
            <ion-col
              v-for="categorie in this.$store.state.categories"
              :key="categorie.id"
              size="6"
            >
              <ion-card class="categorie">
                <img
                  v-if="categorie.plats.length > 0"
                  :src="categorie.plats[0].photo_url"
                  alt="img-categorie"
                />
                <p v-else></p>
                <ion-card-header>
                  <ion-card-subtitle>
                    {{ categorie.libelle }}
                  </ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                  <div class="categorie-buttons">
                    <ion-button
                      slot="end"
                      size="small"
                      @click.stop="
                        openModalUpdateCategorie(
                          categorie.id,
                          categorie.libelle
                        )
                      "
                    >
                      <ion-label>Éditer</ion-label>
                      <ion-icon slot="end" :icon="pencilOutline"></ion-icon>
                    </ion-button>
                    <ion-button
                      slot="end"
                      size="small"
                      @click.stop="deleteCategorie(categorie.id)"
                    >
                      <ion-label>Supprimer</ion-label>
                      <ion-icon slot="end" :icon="trashBinOutline"></ion-icon>
                    </ion-button>
                  </div>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>

        <ion-grid v-if="toggleForm === 'plat'">
          <ion-button fill="outline" @click="openModalPlat()"
            >Ajouter plat</ion-button
          >
          <ion-row>
            <ion-col v-for="plat in plats" :key="plat.id" size="6">
              <ion-card class="plat">
                <img :src="plat.photo_url" alt="img-plat" />
                <ion-card-header>
                  <ion-card-subtitle>
                    {{ plat.libelle }} {{ plat.price + " €" }}
                  </ion-card-subtitle>
                </ion-card-header>
                <ion-card-content>
                  <p>{{ plat.description }}</p>
                  <p>Stock: {{ plat.stock }}</p>
                  <div class="plat-buttons">
                    <ion-button
                      slot="end"
                      size="small"
                      @click.stop="openModalUpdatePlat(plat)"
                    >
                      <ion-label>Éditer</ion-label>
                      <ion-icon slot="end" :icon="pencilOutline"></ion-icon>
                    </ion-button>
                    <ion-button
                      slot="end"
                      size="small"
                      @click.stop="deletePlat(plat.id)"
                    >
                      <ion-label>Supprimer</ion-label>
                      <ion-icon slot="end" :icon="trashBinOutline"></ion-icon>
                    </ion-button>
                  </div>
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
          <ion-card-subtitle>
            Inviter des personnes à votre évènement
          </ion-card-subtitle>
          <ion-card-content>
            <ion-item>
              <ion-icon :icon="lockClosed"></ion-icon>
              <ion-input
                :placeholder="this.$store.state.events.eventTmp.password"
                readonly="true"
                color="danger"
              ></ion-input>
            </ion-item>

            <ion-button size="small" @click="shareEvent()">
              <ion-icon slot="end" :icon="shareSocial"></ion-icon>
              <ion-label>Partager lien</ion-label>
            </ion-button>
            <ion-button
              size="small"
              @click="this.formMailing = !this.formMailing"
            >
              <ion-icon slot="end" :icon="mailOutline"></ion-icon>
              <ion-label>Envoyer mail</ion-label>
            </ion-button>

            <FormMail callApi="sendInvitation" v-if="formMailing"></FormMail>
          </ion-card-content>
        </ion-card>

        <router-link :to="{ name: 'MyEvents' }">
          <ion-button size="small">Retour aux évènements</ion-button>
        </router-link>
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
  IonCardContent,
  IonCardSubtitle,
  IonGrid,
  IonRow,
  IonCol,
  IonCardHeader,
  IonIcon,
} from "@ionic/vue";
import FormEvent from "../components/Forms/FormEvent.vue";
import Sub from "../components/Sub.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { Share } from "@capacitor/share";
import {
  mailOutline,
  shareSocial,
  pencilOutline,
  trashBinOutline,
  lockClosed,
} from "ionicons/icons";
import FormMail from "../components/Forms/FormMail.vue";
import ShowAlert from "../components/AlertController";
import ShowModal from "../components/Modals/ModalController";

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
    IonGrid,
    IonRow,
    IonCol,
    IonCardHeader,
    IonIcon,
    FormEvent,
    FormMail,
    Sub,
    Header,
    Footer,
  },

  setup() {
    return {
      mailOutline,
      shareSocial,
      pencilOutline,
      trashBinOutline,
      lockClosed,
    };
  },
  data() {
    return {
      toggleForm: "categorie",
      disabledStep1: false,
      disabledStep2: true,
      disabledStep3: true,
      formMailing: false,
    };
  },
  ionViewWillEnter() {
    this.$store.commit("setCurrentStep", 1);
    // this.$store.commit("setEventTmp", {});

    if (Object.keys(this.$store.state.events.eventTmp).length > 0) {
      this.disabledStep2 = false;
      this.disabledStep3 = false;
    }
  },
  ionViewDidLeave() {
    this.$store.commit("setEventTmp", {});
    this.$store.commit("setCategories", []);
    this.$store.commit("setPlats", []);
    this.$store.commit("setAddress", "");
    this.$store.commit("setApiAddress", {});
  },
  watch: {
    "$store.state.events.currentStep": function (step) {
      switch (step) {
        case 2:
          this.$store.dispatch(
            "getCategories",
            this.$store.state.events.eventTmp.id
          );
          this.disabledStep2 = false;
          break;
      }
    },

    async toggleForm() {
      await this.$store.dispatch(
        "getCategories",
        this.$store.state.events.eventTmp.id
      );
    },
  },
  computed: {
    noCategory() {
      let noCategory;
      if (this.$store.state.categories.length > 0) {
        noCategory = false;
      } else {
        noCategory = true;
      }
      return noCategory;
    },

    plats() {
      let plats = [];
      this.$store.state.categories.forEach((categorie) => {
        categorie.plats.forEach((plat) => {
          plats.push(plat);
        });
      });
      return plats;
    },
  },
  methods: {
    selectedValue(e) {
      this.toggleForm = e.target.value;
    },

    deleteCategorie(id) {
      ShowAlert.validDelete(
        id,
        "Voulez-vous supprimez cette catégorie ?",
        "categorie"
      );
    },

    openModalCategorie() {
      ShowModal.addCategorie();
    },

    openModalUpdateCategorie(id, libelle) {
      ShowModal.updateCategorie(id, libelle);
    },

    openModalPlat() {
      ShowModal.addPlat();
    },

    openModalUpdatePlat(plat) {
      ShowModal.updatePlat(plat);
    },

    deletePlat(id) {
      ShowAlert.validDelete(id, "Voulez-vous supprimez ce plat ?", "plat");
    },

    async validEvent() {
      ShowAlert.validEvent();
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
ion-card-content {
  --padding-start: 0px;
  --padding-end: 0px;
  --padding-top: 0px;
  --padding-bottom: 0px;
}
.isInactive {
  display: none;
}

.step2 {
  .categorie,
  .plat {
    padding: 1em;
    text-align: center;

    img {
      height: 120px;
      width: 100%;
      border-radius: 5px;
      object-fit: fill;
    }

    .categorie-buttons,
    .plat-buttons {
      margin-top: 0.5em;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}

.step3 {
  text-align: center;
}
</style>