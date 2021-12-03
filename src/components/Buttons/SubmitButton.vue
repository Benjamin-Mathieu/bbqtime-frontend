<template>
  <ion-button @click="submit()" :disabled="disabledButton" type="submit">
    {{ text }}
    <ion-spinner v-if="showSpinner" name="crescent"></ion-spinner>
  </ion-button>
</template>

<script>
import { defineComponent } from "vue";
import { IonButton, IonSpinner } from "@ionic/vue";

export default defineComponent({
  name: "SubmitButton",
  components: { IonButton, IonSpinner },
  props: {
    callApi: {
      type: String,
    },
    payload: {
      type: Object,
      default: null,
    },
    text: {
      type: String,
    },
  },
  data() {
    return {
      showSpinner: false,
      disabledButton: false,
    };
  },

  methods: {
    async submit() {
      this.disabledButton = true;
      this.showSpinner = true;
      await this.$store.dispatch(this.callApi, this.payload);
      this.showSpinner = false;
      this.disabledButton = false;
    },
  },
});
</script>
<style>
</style>