<template>
  <form @submit.prevent="addInfoEvent()" method="post">
    <ion-item>
      <ion-label position="floating">Nom</ion-label>
      <ion-input type="text" v-model="name" required></ion-input>
    </ion-item>
    <ion-item>
      <ion-button @click="openMapModal()">Choisir le lieu</ion-button>
    </ion-item>
    <ion-item> Adresse: {{ this.$store.getters.getAddress.label }} </ion-item>
    <ion-item>
      <ion-label>Date</ion-label>
      <ion-datetime
        v-model="date"
        day-short-names="customDayShortNames"
        display-format="DD MMM"
        month-short-names="janvier, février, mars, avril, mai, juin, juillet, août, septembre, octobre, novembre, décembre"
        done-text="Valider"
        cancel-text="Fermer"
        :min="actualDate"
      ></ion-datetime>
    </ion-item>
    <ion-item>
      <ion-label>Heure</ion-label>
      <ion-datetime
        v-model="hours"
        display-format="HH:mm"
        done-text="Valider"
        cancel-text="Fermer"
        minuteValues="0,15,30,45"
      ></ion-datetime>
    </ion-item>

    <ion-item>
      <ion-label position="floating">Description</ion-label>
      <ion-textarea type="text" v-model="description" required></ion-textarea>
    </ion-item>

    <ion-item>
      <ion-thumbnail v-if="this.file" slot="end">
        <ion-img :src="this.img" alt="img"></ion-img>
      </ion-thumbnail>
      <input
        style="display: none"
        type="file"
        name="image"
        @change="pickImage"
        ref="fileInput"
        accept=".jpeg, jpg, .png"
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
      img: null,
      file: null,
      isPrivate: false,
      password: null,
    };
  },
  computed: {
    actualDate() {
      return new Date().toISOString().slice(0, 10);
    },
  },
  methods: {
    pickImage(selected) {
      this.file = selected.target.files[0];
      this.img = URL.createObjectURL(this.file);
    },
    addInfoEvent() {
      this.address = this.$store.getters.getAddress.name;
      this.city = this.$store.getters.getAddress.city;
      this.zipcode = this.$store.getters.getAddress.postcode;

      //Convert date+hours in DATETIME
      this.date = this.date.slice(0, 10);
      this.hours = this.hours.slice(11, 19);
      const datetime = this.date.concat("T", this.hours, "Z");

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
      return modal.present();
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