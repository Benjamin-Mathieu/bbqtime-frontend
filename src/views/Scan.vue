<template>
  <ion-page>
    <Header></Header>
    <ion-content>
      <div class="test"></div>
      <div class="sample-background">
        <!-- this background simulates the camera view -->
      </div>
      <div class="container">
        <div class="barcode-scanner--area--container">
          <div class="relative">
            <p>Veuillez scanner votre QR-code</p>
          </div>
          <div class="square surround-cover">
            <div class="barcode-scanner--area--outer surround-cover">
              <div class="barcode-scanner--area--inner"></div>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import Header from "../components/Header.vue";

export default defineComponent({
  components: { IonPage, IonContent, Header },
  name: "Scan",
  mounted() {
    this.$store.dispatch("scan");
  },
});
</script>

<style lang="scss" scoped>
ion-content {
  --background: transparent;
  .sample-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: linear-gradient(45deg, #a4d79d, transparent);
    background-position: 45% 50%;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .container {
    display: flex;

    .barcode-scanner--area--container {
      width: 90%;
      max-width: min(500px, 80vh);
      margin: auto;

      .relative {
        position: relative;
        color: #fff;
        text-align: center;
        z-index: 1;
      }

      .square {
        width: 100%;
        position: relative;
        overflow: hidden;
        transition: 0.3s;
      }
      .square:after {
        content: "";
        top: 0;
        display: block;
        padding-bottom: 100%;
      }
      .square > div {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
      }
      .surround-cover {
        box-shadow: 0 0 0 99999px rgba(0, 0, 0, 0.5);
      }

      .barcode-scanner--area--outer {
        display: flex;
        border-radius: 1em;

        .barcode-scanner--area--inner {
          width: 100%;
          margin: 1rem;
          border: 2px solid #fff;
          box-shadow: 0px 0px 2px 1px rgb(0 0 0 / 0.5),
            inset 0px 0px 2px 1px rgb(0 0 0 / 0.5);
          border-radius: 1rem;
        }
      }
    }
  }
}
</style>