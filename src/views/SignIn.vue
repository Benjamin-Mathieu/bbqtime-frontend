<template>
  <ion-page>
    <Header></Header>
    <Sub title="Connexion"></Sub>
    <ion-content>
      <div id="container">
        <FormLoginUser></FormLoginUser>
      </div>
    </ion-content>
    <Footer></Footer>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import Sub from "../components/Sub.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import FormLoginUser from "../components/Forms/FormLoginUser.vue";

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    Sub,
    Header,
    Footer,
    FormLoginUser,
  },
  name: "SignIn",
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
}
</style>