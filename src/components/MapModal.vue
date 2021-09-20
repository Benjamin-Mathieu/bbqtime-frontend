<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Lieu de l'évènement</ion-title>
      <ion-button slot="end" @click="closeModal()">
        <ion-icon name="close"></ion-icon>
      </ion-button>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <div id="mapid" v-if="this.$store.state.address"></div>

    <form class="form" @submit.prevent="getAddress()">
      <ion-item>
        <ion-label position="floating">Tapez l'adresse:</ion-label>
        <ion-input
          type="text"
          v-model="address"
          @focus="this.showList = true"
        ></ion-input>
      </ion-item>
      <ion-list
        inset="true"
        v-if="this.$store.state.respApiAddress && showList"
      >
        <ion-item
          v-for="selectAddress in this.$store.state.respApiAddress.features"
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
  modalController,
} from "@ionic/vue";

export default defineComponent({
  name: "MapModal",
  components: {
    IonHeader,
    IonToolbar,
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
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
    closeModal() {
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