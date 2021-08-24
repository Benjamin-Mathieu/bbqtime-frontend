<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
  mounted() {
    // axios.create({
    //   baseURL: "http://localhost:3000",
    // });
    // axios
    //   .get("/users", {})
    //   .then((resp) => {
    //     console.log(resp);
    //   })
    //   .catch((err) => console.log(err));
  },
});
</script>