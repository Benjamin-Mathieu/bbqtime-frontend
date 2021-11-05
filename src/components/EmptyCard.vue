<template>
  <ion-card id="empty-card">
    <ion-card-header>
      <b> {{ text }}</b>
    </ion-card-header>
  </ion-card>
</template>

<script>
import { defineComponent } from "vue";
import { IonCard, IonCardHeader } from "@ionic/vue";

export default defineComponent({
  name: "EmptyCard",
  components: {
    IonCard,
    IonCardHeader,
  },
  props: {
    text: {
      type: String,
    },
  },
});
</script>

<style lang="scss" scoped>
#empty-card {
  height: 100%;
  text-align: center;
  b {
    color: #7e2727;
  }
}
</style>