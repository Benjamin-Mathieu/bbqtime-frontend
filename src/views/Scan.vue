<template>
  <ion-page>
    <ion-content> <h3>Veuillez scanner votre QR-code</h3> </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import QrCode from "../services/qrcode";
import { IonPage, IonContent } from "@ionic/vue";

export default defineComponent({
  compnents: { IonPage, IonContent },
  name: "Scan",
  mounted() {
    QrCode.scan();
  },
});
</script>

<style lang="scss" scoped>
</style>