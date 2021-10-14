<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Lieu de l'évènement</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <div id="mapid" v-if="this.$store.state.apiGouv.address"></div>

    <form class="form" @submit.prevent="getAddress()">
      <ion-item>
        <ion-label position="floating">Tapez l'adresse:</ion-label>
        <ion-button @click="validAddress()" slot="end">
          <ion-icon :icon="checkmark"></ion-icon>
        </ion-button>
        <ion-input
          type="text"
          v-model="address"
          @ionFocus="this.showList = true"
        ></ion-input>
      </ion-item>
      <ion-list v-if="this.showList">
        <ion-item
          v-for="selectAddress in this.$store.state.apiGouv.respApiAddress"
          :key="selectAddress.id"
        >
          <ion-label
            @click="
              this.address = selectAddress.properties.label;
              this.showList = false;
            "
            >{{ selectAddress.properties.label }}</ion-label
          >
        </ion-item>
      </ion-list>
    </form>
  </ion-content>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonIcon,
  IonTitle,
  IonButton,
  IonList,
  modalController,
} from "@ionic/vue";
import { checkmark } from "ionicons/icons";

export default defineComponent({
  name: "MapModal",
  components: {
    IonHeader,
    IonToolbar,
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
    IonIcon,
    IonTitle,
    IonButton,
    IonList,
  },
  setup() {
    return {
      checkmark,
    };
  },
  data() {
    return {
      address: "",
      showList: true,
    };
  },
  watch: {
    address() {
      this.$store.commit("setAddress", this.address.replaceAll(" ", "+"));
      this.$store.dispatch("getAddress");
    },
  },
  methods: {
    validAddress() {
      modalController.dismiss();
    },
  },
});
</script>

<style lang="scss" scoped>
#mapid {
  height: 100%;
  width: 100%;
  margin: auto;
}

.form {
  position: absolute;
  z-index: 1000;
  width: 100%;
  bottom: 0;
}
</style>