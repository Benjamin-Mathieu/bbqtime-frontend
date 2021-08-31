<template>
  <form @submit.prevent="addInfoEvent()" method="post">
    <ion-item>
      <ion-label position="floating">Nom de l'évènement</ion-label>
      <ion-input type="text" v-model="name" required></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="floating">Adresse</ion-label>
      <ion-input type="text" v-model="address" required></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="floating">Ville</ion-label>
      <ion-input type="text" v-model="city" required></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="floating">Code postale</ion-label>
      <ion-input type="text" v-model="zipcode" required></ion-input>
    </ion-item>

    <ion-item>
      <ion-label>Date</ion-label>
      <ion-datetime
        v-model="date"
        :day-short-names="customDayShortNames"
        display-format="DDD. MMM DD"
        month-short-names="janvier, fevrier, mars, avril, mai, juin, juillet, août, septembre, octobre, novembre, décembre"
      ></ion-datetime>
    </ion-item>
    <ion-item>
      <ion-label>Heure</ion-label>
      <ion-datetime v-model="hours" display-format="hh:mm:ss"></ion-datetime>
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

    <ion-button type="submit" size="small">Valider</ion-button>
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
} from "@ionic/vue";

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
      address: "",
      city: "",
      zipcode: "",
      date: "",
      hours: "",
      description: "",
      isPrivate: true,
    };
  },
  mounted() {},
  methods: {
    addInfoEvent() {
      const event = {
        name: this.name,
        address: this.address,
        city: this.city,
        zipcode: this.zipcode,
        description: this.description,
        private: this.isPrivate,
      };

      try {
        this.$store.commit("setEvents", event);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
</script>