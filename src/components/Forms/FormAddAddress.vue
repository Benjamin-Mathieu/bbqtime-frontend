<template>
  <form class="form" @submit.prevent="getAddress()">
    <ion-item>
      <ion-label position="stacked">Tapez l'adresse:</ion-label>
      <ion-button @click="closeModal()" slot="end">
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
  modalController,
} from "@ionic/vue";
import { checkmark } from "ionicons/icons";

export default defineComponent({
  name: "FormAddAddress",
  components: {
    IonInput,
    IonItem,
    IonLabel,
    IonIcon,
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
    closeModal() {
      modalController.dismiss();
    },
  },
});
</script>

<style lang="scss" scoped>
.form {
  position: absolute;
  z-index: 1000;
  width: 100%;
  bottom: 0;
}
</style>