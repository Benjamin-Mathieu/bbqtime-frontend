<template>
  <transition name="fade">
    <div
      @click="closeOnePage()"
      v-if="this.$store.state.showOnePage === true"
      class="one-page"
    >
      <div class="header">
        <div class="header-content">
          <img src="../../public/assets/logo1.png" alt="bg-bbqtime" />
        </div>
        <ion-button @click="go()" class="button">GO</ion-button>
      </div>
      <img src="../../public/assets/background.png" alt="bg-bbqtime" />
    </div>
  </transition>
</template>

<script>
import { defineComponent } from "vue";
import { IonButton } from "@ionic/vue";

export default defineComponent({
  name: "OnePage",
  components: { IonButton },
  methods: {
    go() {
      this.$store.commit("setShowOnePage", false);
    },

    closeOnePage() {
      this.$store.commit("setShowOnePage", false);
    },
  },
});
</script>


<style lang="scss" scoped>
.one-page {
  height: 100vh;
  z-index: 2000;

  ion-button {
    position: absolute;
    bottom: 1em;
    right: 10%;
    width: 80px;
  }

  .header {
    background-color: white;
    width: 100%;
    height: 35%;
    border-bottom-right-radius: 50px;
    border-bottom-left-radius: 50px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2001;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    .header-content {
      text-align: center;
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      img {
        height: 128px;
        width: 311px;
      }
    }
  }

  img {
    height: 100%;
    width: 100%;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(-100%);
}
</style>