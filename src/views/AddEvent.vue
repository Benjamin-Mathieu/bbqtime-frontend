 <template>
  <ion-page>
    <h1>Création évènement</h1>
    <ion-content>
      <!-- ETAPES (1: Evènement, 2: Categorie + Menu, 3: Paiement, 4: Confirmation création évènement) -->
      <ion-segment :value="step">
        <ion-segment-button value="1">
          <ion-label>Step 1</ion-label>
        </ion-segment-button>
        <ion-segment-button value="2">
          <ion-label>Step 2</ion-label>
        </ion-segment-button>
        <ion-segment-button value="3" disabled>
          <ion-label>Step 3</ion-label>
        </ion-segment-button>
        <ion-segment-button value="4" disabled>
          <ion-label>Step 4</ion-label>
        </ion-segment-button>
      </ion-segment>

      <!-- ETAPE 2 -->
      <ion-content v-if="step === 2">
        <ion-segment :value="toggleForm">
          <ion-segment-button value="categorie">
            <ion-label>Catégorie</ion-label>
          </ion-segment-button>
          <ion-segment-button value="menu">
            <ion-label>Menu</ion-label>
          </ion-segment-button>
        </ion-segment>

        <ion-button
          @click="openModalCategorie"
          v-if="toggleForm === 'categorie'"
          >Ajouter une catégorie</ion-button
        >
        <ion-button @click="openModalMenu" v-else>Ajouter un menu</ion-button>
        <ion-button size="small" @click="goMenu()">go menu</ion-button>
        <ion-button size="small" @click="goCategorie()"
          >go categorie</ion-button
        >
        <div v-if="toggleForm === 'categorie'">
          <ion-card
            v-for="categorie in this.$store.state.categories"
            :key="categorie.id"
          >
            <ion-item>
              <ion-label
                ><b>{{ categorie }}</b></ion-label
              >
            </ion-item>
          </ion-card>
        </div>
      </ion-content>

      <FormEvent v-if="step === 1"></FormEvent>
      <ion-button @click="nextStep()">NEXT STEP</ion-button>

      <FormCategorie v-if="step === 0"></FormCategorie>
      <FormMenu v-if="step === 0"></FormMenu>
    </ion-content>
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
  IonItem,
  IonCard,
  modalController,
  alertController,
} from "@ionic/vue";
import FormEvent from "../components/FormEvent.vue";
import FormCategorie from "../components/FormCategorie.vue";
import FormMenu from "../components/FormMenu.vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "AddEvent",
  components: {
    IonContent,
    IonPage,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonButton,
    IonItem,
    IonCard,
    FormEvent,
    FormCategorie,
    FormMenu,
  },
  data() {
    return {
      step: 1,
      toggleForm: "categorie",
    };
  },
  methods: {
    ...mapActions(["postEvent", "postCategorie", "postMenu"]),

    goMenu() {
      this.toggleForm = "menu";
    },
    goCategorie() {
      this.toggleForm = "categorie";
    },

    nextStep() {
      this.step++;
      if (this.step >= 3) {
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
        this.postEvent();
        this.step++;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.isInactive {
  display: none;
}
</style>