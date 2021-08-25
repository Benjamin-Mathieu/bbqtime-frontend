<template>
  <h1>SCAN</h1>
  <ion-button @click="scan()">Test scanEEEE</ion-button>
</template>

<script>
import { defineComponent } from "vue";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";

export default defineComponent({
  name: "Scan",
  mounted() {},
  methods: {
    scan() {
      // check or request permission
      BarcodeScanner.checkPermission({ force: true })
        .then((res) => console.log(res, "Permissions ok"))
        .catch((err) => console.log(err));

      BarcodeScanner.hideBackground(); // make background of WebView transparent

      const result = BarcodeScanner.startScan()
        .then((res) => {
          console.log(res);
          // if the result has content
          if (result.hasContent) {
            console.log(result.content); // log the raw scanned content
          }
        })
        .catch((err) => console.log(err)); // start scanning and wait for a result
    },
  },
});
</script>

<style lang="scss" scoped>
</style>