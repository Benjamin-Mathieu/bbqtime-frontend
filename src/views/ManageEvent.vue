<template>
  <ion-page>
    <Header></Header>
    <Sub title="Gérer évènement"></Sub>
    <ion-content>
      <ActionsButton></ActionsButton>

      <div id="container">
        <div class="buttons">
          <ion-button @click="editEvent()">
            <ion-label>Editer informations</ion-label>
          </ion-button>
          <ion-button @click="editCategoriePlat()">
            <ion-label>Editer catégories/plats</ion-label>
          </ion-button>
          <router-link
            class="links"
            :to="{
              name: 'MyEventDetails',
              params: { id: this.$route.params.id },
            }"
          >
            <ion-button>
              <ion-label>Voir commandes/budget</ion-label>
            </ion-button>
          </router-link>
        </div>
      </div>
    </ion-content>
    <Footer></Footer>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import { IonContent, IonPage, IonButton, IonLabel } from "@ionic/vue";
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
    Sub,
    Header,
    Footer,
    ActionsButton,
  },
  ionViewWillEnter() {
    console.log("ionviewwillenter");
    this.$store.dispatch("getEventToEdit", this.$route.params.id);
  },
  methods: {
    editEvent() {
      ShowModal.editInfoEvent();
    },
    async editCategoriePlat() {
      await this.$store.dispatch(
        "getCategories",
        this.$store.state.events.eventTmp.id
      );
      ShowModal.editCategoriePlat();
    },
  },
});
</script>

<style lang="scss" scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>