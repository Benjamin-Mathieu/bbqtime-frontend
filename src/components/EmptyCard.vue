<template>
  <ion-card>
    <ion-card-header> {{ text }} </ion-card-header>
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