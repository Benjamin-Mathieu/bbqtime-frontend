<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Ajouter administrateur</ion-title>
      <ion-button slot="end" @click="closeModal()">
        <ion-icon name="close"></ion-icon>
      </ion-button>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <form @submit.prevent="sendMail()" method="post">
      <div
        class="inputs"
        v-for="(input, index) in emails"
        :key="`emailInput-${index}`"
      >
        <ion-item>
          <ion-input
            v-model="input.email"
            type="email"
            placeholder="Tapez le mail"
            required
          >
          </ion-input>
          <ion-button
            v-if="this.emails.length > 1"
            size="small"
            fill="outline"
            @click="removeInput(index)"
          >
            <ion-icon :icon="removeCircleOutline"></ion-icon>
          </ion-button>
        </ion-item>
      </div>
      <ion-button size="small" @click="addInput()">
        <ion-icon :icon="addCircleOutline"></ion-icon>
      </ion-button>

      <ion-button type="submit" size="small">Envoyer</ion-button>
    </form>
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
  IonInput,
  IonIcon,
  IonItem,
  modalController,
} from "@ionic/vue";
import { addCircleOutline, removeCircleOutline } from "ionicons/icons";

export default defineComponent({
  name: "ModalAddAssociate",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonInput,
    IonIcon,
    IonItem,
  },
  setup() {
    return {
      addCircleOutline,
      removeCircleOutline,
    };
  },
  data() {
    return {
      emails: [{ email: "" }],
    };
  },
  methods: {
    closeModal() {
      modalController.dismiss();
    },
    addInput() {
      this.emails.push({ email: "" });
      console.log("add =>", this.emails);
    },
    removeInput(index) {
      console.log("index =>", index);
      this.emails.splice(index, 1);
      console.log("splice =>", this.emails);
    },
    sendMail() {
      const listMails = JSON.parse(JSON.stringify(this.emails));
      console.log(listMails, typeof listMails);
      listMails.forEach((objMail) => {
        this.$store.dispatch("addAdmin", objMail.email);
      });
      this.emails = [{ email: "" }];
    },
  },
});
</script>

<style lang="scss" scoped>
</style>