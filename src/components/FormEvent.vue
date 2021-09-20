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
        display-format="DD MMM "
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
      <input
        style="display: none"
        type="file"
        name="image"
        @change="pickImage"
        ref="fileInput"
      />
      <ion-button size="small" @click="$refs.fileInput.click()">
        Ajouter une image
      </ion-button>
    </ion-item>

    <ion-item>
      <ion-label>Evènement privé:</ion-label>
      <ion-checkbox
        color="primary"
        v-model="isPrivate"
        slot="end"
      ></ion-checkbox>
    </ion-item>

    <ion-item>
      <ion-label position="floating">Mot de passe</ion-label>
      <ion-input type="password" v-model="password" required></ion-input>
    </ion-item>

    <ion-item>
      <ion-button type="submit" size="small" slot="end">Valider</ion-button>
    </ion-item>
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
      name: "",
      date: "",
      hours: "",
      description: "",
      file: null,
      isPrivate: false,
      password: null,
      test: "",
    };
  },
  mounted() {
    this.test = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

    // British English uses day-month-year order and 24-hour time without AM/PM
    console.log(this.test.toLocaleString("fr-FR", { timeZone: "UTC" }));
    // expected output: 20/12/2012, 03:00:00
  },
  methods: {
    pickImage(selected) {
      this.file = selected.target.files[0];
    },
    addInfoEvent() {
      this.address = this.$store.getters.getAddress.name;
      this.city = this.$store.getters.getAddress.city;
      this.zipcode = this.$store.getters.getAddress.postcode;

      //Convert date+hours in DATETIME
      this.date = this.date.slice(0, 10);
      this.hours = this.hours.slice(11, 19);
      const datetime = this.date.concat(" ", this.hours);

      const event = {
        name: this.name,
        address: this.address,
        city: this.city,
        zipcode: this.zipcode,
        date: datetime,
        description: this.description,
        private: this.isPrivate,
        file: this.file,
        password: this.password,
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

<style lang="scss" scoped>
form {
  width: 80%;
  margin: auto;
}
</style>