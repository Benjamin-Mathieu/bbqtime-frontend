<template>
  <ion-page>
    <h1>Création évènement</h1>
    <ion-content>
      <!-- NAVIGATION -->
      <ion-segment @ionChange="segmentChanged($event)">
        <ion-segment-button value="step1">
          <ion-label>Step 1</ion-label>
        </ion-segment-button>
        <ion-segment-button value="step2">
          <ion-label>Step 2</ion-label>
        </ion-segment-button>
        <ion-segment-button value="step3">
          <ion-label>Step 3</ion-label>
        </ion-segment-button>
        <ion-segment-button value="step4">
          <ion-label>Step 4</ion-label>
        </ion-segment-button>
      </ion-segment>

      <!-- FORMS CATEGORIE & MENU -->
      <ion-segment v-if="step === 2" @ionChange="segmentChanged($event)">
        <ion-segment-button value="categorie">
          <ion-label>Catégorie</ion-label>
        </ion-segment-button>
        <ion-segment-button value="menu">
          <ion-label>Menu</ion-label>
        </ion-segment-button>
      </ion-segment>

      <FormEvent v-if="step === 1"></FormEvent>
      <FormCategorie v-if="step === 2"></FormCategorie>
      <FormMenu v-if="step === 2"></FormMenu>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import { IonContent, IonPage, IonSegment, IonSegmentButton } from "@ionic/vue";
import FormEvent from "../components/FormEvent.vue";
import FormCategorie from "../components/FormCategorie.vue";
import FormMenu from "../components/FormMenu.vue";

export default defineComponent({
  name: "AddEvent",
  components: {
    IonContent,
    IonPage,
    IonSegment,
    IonSegmentButton,
    FormEvent,
    FormCategorie,
    FormMenu,
  },
  data() {
    return {
      step: 2,
    };
  },
  methods: {
    segmentChanged(ev) {
      console.log("Segment changed", ev);

      switch (ev.detail.value) {
        case "event":
          this.step === 1;
          break;
        case "categorie":
          this.step === 2;
          break;
        case "Papayas":
          this.step === 3;
          break;
        default:
          console.log(`Error`);
      }
    },
  },
});
</script>