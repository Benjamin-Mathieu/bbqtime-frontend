<template>
  <ion-page>
    <Header></Header>
    <Sub title="Créer un compte"></Sub>
    <ion-content>
      <div id="container">
        <FormSignUpUser></FormSignUpUser>
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
import FormSignUpUser from "../components/Forms/FormSignUpUser.vue";

export default defineComponent({
  name: "SignUp",
  components: {
    IonPage,
    IonContent,
    Sub,
    Header,
    Footer,
    FormSignUpUser,
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
}
</style>