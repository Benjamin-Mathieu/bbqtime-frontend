<template>
  <ion-refresher
    :callApi="callApi"
    slot="fixed"
    @ionRefresh="doRefresh($event)"
  >
    <ion-refresher-content></ion-refresher-content>
  </ion-refresher>
</template>

<script>
import { defineComponent } from "vue";
import { IonRefresher, IonRefresherContent } from "@ionic/vue";

export default defineComponent({
  name: "Refresh",
  components: { IonRefresher, IonRefresherContent },
  props: {
    callApi: {
      type: String,
    },
  },

  methods: {
    async doRefresh(event) {
      await this.$store.dispatch(this.callApi);
      event.target.complete();
    },
  },
});
</script>
<style>
</style>