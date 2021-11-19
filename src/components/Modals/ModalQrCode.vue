<template>
  <ion-header>
    <ion-toolbar>
      <ion-title><h2>Qrcode</h2></ion-title>
      <ion-button slot="end" fill="clear" @click="closeModal()">
        <ion-icon name="close"></ion-icon>
      </ion-button>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <div id="container">
      <ion-img :src="qrcode" class="qrcode" alt="qrcode"></ion-img>
      <ion-button @click="save()">
        Télécharger
        <ion-icon slot="end" :icon="download"></ion-icon>
      </ion-button>
    </div>
  </ion-content>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonButton,
  IonTitle,
  IonIcon,
  IonToolbar,
  IonHeader,
  IonContent,
  IonImg,
  modalController,
} from "@ionic/vue";
import { download } from "ionicons/icons";
import popup from "../../components/ToastController";
import { Filesystem, Directory } from "@capacitor/filesystem";

export default defineComponent({
  name: "ModalQrCode",
  components: {
    IonButton,
    IonTitle,
    IonIcon,
    IonToolbar,
    IonHeader,
    IonContent,
    IonImg,
  },
  setup() {
    return {
      download,
    };
  },
  data() {
    return {
      qrcode: this.$store.state.events.eventTmp.qrcode,
    };
  },
  methods: {
    async closeModal() {
      modalController.dismiss();
    },

    async save() {
      const event = this.$store.state.events.eventTmp;
      const file = await Filesystem.appendFile({
        path: `${event.name}-${event.id}.png`,
        data: event.qrcode,
        directory: Directory.Documents,
      });
      console.log("file =>", file);
      if (file) {
        popup.success("Qrcode télécharger sur votre appareil");
      }
    },
  },
});
</script>

<style lang="scss" scoped>
#container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30%;
  .qrcode {
    width: 80%;
  }
  ion-button {
    margin-top: 1em;
  }
}
</style>