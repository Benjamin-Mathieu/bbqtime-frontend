<template>
  <ion-page>
    <Header></Header>
    <Sub title="Mon compte"></Sub>
    <ion-content>
      <div id="container">
        <FormUpdateProfilUser></FormUpdateProfilUser>

        <div class="buttons">
          <router-link :to="{ name: 'MyEvents' }">
            <ion-button>
              <ion-label>Mes évènements</ion-label>
              <ion-icon slot="end" :icon="calendarOutline"></ion-icon>
            </ion-button>
          </router-link>

          <router-link :to="{ name: 'Orders' }">
            <ion-button>
              <ion-label>Mes commandes</ion-label>
              <ion-icon slot="end" :icon="bagOutline"></ion-icon>
            </ion-button>
          </router-link>
        </div>
      </div>
    </ion-content>
    <Footer></Footer>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import { IonPage, IonContent, IonButton, IonIcon, IonLabel } from "@ionic/vue";
import { bagOutline, calendarOutline } from "ionicons/icons";
import Sub from "../components/Sub.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import FormUpdateProfilUser from "../components/Forms/FormUpdateProfilUser.vue";

export default defineComponent({
  name: "Account",

  components: {
    IonPage,
    IonContent,
    IonButton,
    IonIcon,
    IonLabel,
    Header,
    Sub,
    Footer,
    FormUpdateProfilUser,
  },

  setup() {
    return { bagOutline, calendarOutline };
  },
});
</script>

<style lang="scss" scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  .buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>