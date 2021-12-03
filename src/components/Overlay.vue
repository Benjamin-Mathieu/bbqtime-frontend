<template>
  <div v-if="this.$store.state.showOverlay === true" class="overlay">
    <div class="spinner">
      <ion-spinner color="light" name="bubbles"></ion-spinner>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { IonSpinner } from "@ionic/vue";

export default defineComponent({
  name: "Overlay",
  components: { IonSpinner },
});
</script>


<style lang="scss" scoped>
.overlay {
  position: fixed;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.8);
  width: 100vw;
  height: 100vh;

  .spinner {
    z-index: 2001;
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>