<template>
  <ion-footer>
    <ion-toolbar color="primary">
      <ion-title>Footer</ion-title>
    </ion-toolbar>
  </ion-footer>
</template>

<script>
import { IonFooter, IonToolbar, IonTitle } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
  components: {
    IonFooter,
    IonToolbar,
    IonTitle,
  },
});
</script>

<style lang="scss" scoped>
</style>