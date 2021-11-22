<template>
  <form class="form">
    <ion-item>
      <ion-label position="stacked">Adresse</ion-label>
      <ion-input type="text" v-model="address"></ion-input>
      <span class="hide-button">
        <ion-button
          size="large"
          @click.stop="toggleList()"
          fill="clear"
          slot="end"
        >
          <ion-icon :icon="chevronDown"></ion-icon>
        </ion-button>
      </span>
    </ion-item>
    <ion-item v-if="showList === true">
      <ion-list lines="none">
        <ion-item>Sélectionnez dans la liste : </ion-item>
        <ion-item
          v-for="selectAddress in this.$store.state.apiGouv.respApiAddress"
          :key="selectAddress.id"
        >
          <ion-label @click="changeMap(selectAddress.properties.label)">
            {{ selectAddress.properties.label }}
          </ion-label>
          <ion-spinner v-if="showSpinner" name="circles"></ion-spinner>
        </ion-item>
      </ion-list>
    </ion-item>
    <ion-button expand="full" size="small" @click="closeModal()" slot="end">
      <ion-icon :icon="checkmark"></ion-icon>
    </ion-button>
  </form>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonInput,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonList,
  IonSpinner,
  modalController,
} from "@ionic/vue";
import { checkmark, chevronDown } from "ionicons/icons";
import Map from "../../services/map";

export default defineComponent({
  name: "FormAddAddress",
  components: {
    IonInput,
    IonItem,
    IonLabel,
    IonIcon,
    IonButton,
    IonList,
    IonSpinner,
  },
  setup() {
    return {
      checkmark,
      chevronDown,
    };
  },

  data() {
    return {
      address: "",
      showList: true,
      showSpinner: false,
    };
  },

  watch: {
    async address() {
      this.showSpinner = true;
      this.$store.commit("setAddress", this.address);
      await this.$store.dispatch("getAddress");
      this.showSpinner = false;
    },
  },

  methods: {
    closeModal() {
      modalController.dismiss();
    },

    changeMap(selectedAdress) {
      console.log({ selectedAdress });
      this.address = selectedAdress;
      const latitude =
        this.$store.state.apiGouv.respApiAddress[0].geometry.coordinates[1];
      const longitude =
        this.$store.state.apiGouv.respApiAddress[0].geometry.coordinates[0];
      console.log("lat", latitude, "lon", longitude);
      Map.getMap(latitude, longitude);
      this.showList = false;
    },

    toggleList() {
      this.showList = !this.showList;
    },
  },
});
</script>

<style lang="scss" scoped>
.hide-button {
  position: absolute;
  bottom: 0;
  right: 0;
}
.form {
  position: absolute;
  z-index: 1000;
  width: 100%;
  bottom: 0;
}
</style>