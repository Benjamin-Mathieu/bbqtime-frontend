<template>
  <ion-page>
    <Header></Header>
    <ion-content class="test">
      <h3>Veuillez scanner votre QR-code</h3>
    </ion-content>
    <Footer></Footer>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import QrCode from "../services/qrcode";
import { IonPage, IonContent } from "@ionic/vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

export default defineComponent({
  components: { IonPage, IonContent, Header, Footer },
  name: "Scan",
  mounted() {
    QrCode.scan();
  },
});
</script>

<style lang="scss" scoped>
</style>