<template>
  <ion-page>
    <Header></Header>
    <Sub title="Gérer évènement"></Sub>
    <ion-content>
      <ActionsButton></ActionsButton>

      <div id="container">
        <ion-card>
          <img :src="event.photo_url" />
          <ion-card-header>
            <ion-card-title color="primary">{{ event.name }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="buttons">
              <ion-button @click="editEvent()">
                <ion-label>Editer informations</ion-label>
              </ion-button>
              <ion-button @click="editCategoriePlat()">
                <ion-label>Editer catégorie / plat</ion-label>
              </ion-button>
              <ion-button @click="redirectTo()">
                <ion-label>Voir commandes / budget</ion-label>
              </ion-button>
            </div>
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
  IonButton,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/vue";
import Sub from "../components/Sub.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import ShowModal from "../components/Modals/ModalController";
import ActionsButton from "../components/Buttons/EventActionsButton.vue";

export default defineComponent({
  name: "ManageEvent",
  components: {
    IonContent,
    IonPage,
    IonButton,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    Sub,
    Header,
    Footer,
    ActionsButton,
  },

  computed: {
    event() {
      return this.$store.state.events.eventTmp;
    },
  },

  ionViewWillEnter() {
    this.$store.dispatch("getEvent", this.$route.params.id);
  },

  ionViewWillLeave() {
    this.$store.commit("setEventTmp", {});
    this.$store.commit("setCategories", {});
  },

  methods: {
    editEvent() {
      ShowModal.editInfoEvent();
    },

    async editCategoriePlat() {
      await this.$store.dispatch("getCategories");
      ShowModal.editCategoriePlat();
    },

    redirectTo() {
      this.$router.push({
        name: "MyEventDetails",
      });
    },
  },
});
</script>

<style lang="scss" scoped>
#container {
  // text-align: center;
  // position: absolute;
  // left: 0;
  // right: 0;
  // top: 50%;
  // transform: translateY(-50%);

  img {
    width: 100%;
    max-height: 160px;
    object-fit: cover;
  }

  .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>