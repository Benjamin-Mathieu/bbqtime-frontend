<template>
  <div class="event">
    <div class="img-container">
      <ion-skeleton-text
        animated
        style="width: 100%; height: 100%"
      ></ion-skeleton-text>
    </div>

    <div class="preview-container">
      <ion-skeleton-text
        animated
        style="height: 16px; width: 100%"
      ></ion-skeleton-text>
      <ion-skeleton-text
        animated
        style="height: 16px; width: 100%"
      ></ion-skeleton-text>
      <ion-skeleton-text
        animated
        style="height: 16px; width: 100%"
      ></ion-skeleton-text>
      <ion-skeleton-text
        animated
        style="height: 16px; width: 100%"
      ></ion-skeleton-text>
      <ion-skeleton-text
        animated
        style="height: 16px; width: 100%"
      ></ion-skeleton-text>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { IonSkeletonText } from "@ionic/vue";

export default defineComponent({
  name: "Skeleton",
  components: {
    IonSkeletonText,
  },
});
</script>

<style lang="scss" scoped>
.event {
  display: flex;
  min-height: 129px;
  .img-container {
    width: 40%;
    padding: 0.5em;
  }

  .preview-container {
    width: 60%;
    padding: 0.5em;
  }
}
</style>