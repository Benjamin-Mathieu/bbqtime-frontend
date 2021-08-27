<template>
  <h3>Veuillez scanner votre QR-code</h3>
</template>

<script>
import { defineComponent } from "vue";
import QrCode from "../services/qrcode";

export default defineComponent({
  name: "Scan",
  mounted() {
    QrCode.scan();
  },
});
</script>

<style lang="scss" scoped>
</style>