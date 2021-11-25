<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Editer évènement</ion-title>
      <ion-button fill="clear" slot="end" @click="closeModal()">
        <ion-icon name="close"></ion-icon>
      </ion-button>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <div id="form-container">
      <FormEvent></FormEvent>
    </div>
  </ion-content>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  modalController,
} from "@ionic/vue";
import FormEvent from "../Forms/FormEvent.vue";

export default defineComponent({
  name: "ModalEditInfoEvent",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    FormEvent,
  },

  unmounted() {
    this.$store.commit("setApiAddress", {});
  },

  methods: {
    closeModal() {
      modalController.dismiss();
    },
  },
});
</script>

<style lang="scss" scoped>
#form-container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>