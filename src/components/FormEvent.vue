<template>
  <form @submit.prevent="addInfoEvent()" method="post">
    <ion-item>
      <ion-label position="floating">Nom de l'évènement</ion-label>
      <ion-input type="text" v-model="name" required></ion-input>
    </ion-item>
    <ion-item>
      <ion-button @click="openMapModal()">Lieu</ion-button>
    </ion-item>
    <ion-item v-if="this.$store.getters.getAddress"
      >Adresse: {{ this.$store.getters.getAddress.label }}
    </ion-item>
    <ion-item>
      <ion-label>Date</ion-label>
      <ion-datetime
        v-model="date"
        :day-short-names="customDayShortNames"
        display-format="DDD. MMM DD"
        month-short-names="janvier, fevrier, mars, avril, mai, juin, juillet, août, septembre, octobre, novembre, décembre"
        done-text="Valider"
        cancel-text="Fermer"
      ></ion-datetime>
    </ion-item>
    <ion-item>
      <ion-label>Heure</ion-label>
      <ion-datetime
        v-model="hours"
        display-format="hh:mm"
        done-text="Valider"
        cancel-text="Fermer"
      ></ion-datetime>
    </ion-item>

    <ion-item>
      <ion-label position="floating">Description</ion-label>
      <ion-textarea type="text" v-model="description" required></ion-textarea>
    </ion-item>

    <ion-item>
      <input type="file" name="photoUrl" />
    </ion-item>

    <ion-item>
      <ion-label>Evènement privé:</ion-label>
      <ion-checkbox
        color="primary"
        v-model="isPrivate"
        slot="end"
      ></ion-checkbox>
    </ion-item>

    <ion-button type="submit" size="small">Créer l'évènement</ion-button>
  </form>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonLabel,
  IonItem,
  IonButton,
  IonCheckbox,
  IonInput,
  IonDatetime,
  IonTextarea,
  modalController,
  alertController,
} from "@ionic/vue";
import MapModal from "./MapModal.vue";

export default defineComponent({
  name: "FormEvent",
  components: {
    IonLabel,
    IonItem,
    IonButton,
    IonCheckbox,
    IonInput,
    IonDatetime,
    IonTextarea,
  },
  data() {
    return {
      name: "Test API",
      date: "",
      hours: "",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      isPrivate: true,
    };
  },
  mounted() {},
  methods: {
    addInfoEvent() {
      this.address = this.$store.getters.getAddress.name;
      this.city = this.$store.getters.getAddress.city;
      this.zipcode = this.$store.getters.getAddress.postcode;

      const event = {
        name: this.name,
        address: this.address,
        city: this.city,
        zipcode: this.zipcode,
        description: this.description,
        private: this.isPrivate,
      };

      this.$store.commit("setEventTmp", event);
      this.$store.dispatch("postEvent");
    },

    async openMapModal() {
      const modal = await modalController.create({
        component: MapModal,
      });

      // handle "onDidDismiss"
      // modal.onWillDismiss().then(() => this.validEvent());

      return modal.present();
    },

    async validEvent() {
      const alert = await alertController.create({
        subHeader: "Validez l'adresse saisi ?",
        buttons: [
          {
            text: "Non",
            role: "cancel",
          },
          {
            text: "Oui",
            role: "valid",
          },
        ],
      });
      await alert.present();

      const { role } = await alert.onDidDismiss();
      console.log("onDidDismiss resolved with role", role);
      if (role === "valid") {
        console.log(role);
      }
    },
  },
});
</script>