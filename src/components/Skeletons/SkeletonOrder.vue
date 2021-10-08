<template>
  <div class="event">
    <div class="img-container">
      <ion-skeleton-text
        animated
        style="width: 100%; height: 100%"
      ></ion-skeleton-text>
    </div>

    <div class="preview-container">
      <ion-card-title>
        <h5>
          <ion-skeleton-text animated style="width: 80px"></ion-skeleton-text>
        </h5>
      </ion-card-title>
      <ion-card-content class="preview">
        <ion-skeleton-text animated style="width: 100%"></ion-skeleton-text>
        <ion-skeleton-text animated style="width: 100%"></ion-skeleton-text>
      </ion-card-content>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { IonSkeletonText, IonCardTitle, IonCardContent } from "@ionic/vue";

export default defineComponent({
  name: "Skeleton",
  components: {
    IonSkeletonText,
    IonCardTitle,
    IonCardContent,
  },
});
</script>

<style lang="scss" scoped>
.event {
  display: flex;
  min-height: 129px;
  .img-container {
    width: 30%;
    padding: 0.5em;
    img {
      border-radius: 5px;
      height: 100%;
      object-fit: fill;
    }
  }

  .preview-container {
    .preview {
      padding: 0px;
    }
  }
}
</style>