<template>
  <form class="form">
    <ion-item>
      <ion-label position="stacked">Adresse</ion-label>
      <ion-input
        type="text"
        v-model="address"
        @ionFocus="showList = true"
      ></ion-input>
    </ion-item>
    <ion-item v-if="showList === true">
      <ion-list lines="none">
        <ion-item>Sélectionnez dans la liste : </ion-item>
        <ion-item
          v-for="selectAddress in this.$store.state.apiGouv.respApiAddress"
          :key="selectAddress.id"
        >
          <ion-label @click="address = selectAddress.properties.label">{{
            selectAddress.properties.label
          }}</ion-label>
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
      this.$store.commit("setAddress", this.address);
      this.$store.dispatch("getAddress");
    },

    "$store.state.apiGouv.address": function (e) {
      this.address = e;
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