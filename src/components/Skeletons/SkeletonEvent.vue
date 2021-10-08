<template>
  <ion-grid>
    <ion-row>
      <ion-col size="2">
        <ion-skeleton-text
          animated
          style="width: 100%; height: 100%"
        ></ion-skeleton-text>
      </ion-col>
      <ion-col size="10">
        <ion-item>
          <ion-label>
            <ion-skeleton-text animated style="width: 80px"></ion-skeleton-text>
          </ion-label>
        </ion-item>

        <ion-card-content>
          <ion-item lines="none">
            <ion-skeleton-text animated style="width: 100%"></ion-skeleton-text>
          </ion-item>
          <ion-item lines="none">
            <ion-skeleton-text animated style="width: 100%">
            </ion-skeleton-text>
          </ion-item>
          <ion-item lines="none">
            <ion-label>
              <ion-skeleton-text
                animated
                style="width: 100%"
              ></ion-skeleton-text>
            </ion-label>
          </ion-item>
        </ion-card-content>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonCardContent,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonSkeletonText,
} from "@ionic/vue";

export default defineComponent({
  name: "Skeleton",
  components: {
    IonCardContent,
    IonItem,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    IonSkeletonText,
  },
});
</script>
<style>
</style>