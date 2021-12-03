<template>
  <form @submit.prevent="sendMail()" method="post">
    <div
      class="inputs"
      v-for="(input, index) in emails"
      :key="`emailInput-${index}`"
    >
      <ion-item>
        <ion-input
          v-model="input.email"
          type="email"
          placeholder="Tapez le mail"
          required
        >
        </ion-input>
        <ion-button
          v-if="this.emails.length > 1"
          size="small"
          fill="outline"
          @click="removeInput(index)"
        >
          <ion-icon :icon="removeCircleOutline"></ion-icon>
        </ion-button>
      </ion-item>
    </div>
    <ion-button size="small" @click="addInput()">
      <ion-icon :icon="addCircleOutline"></ion-icon>
    </ion-button>

    <ion-button type="submit" size="small">Envoyer</ion-button>
  </form>
</template>

<script>
import { defineComponent } from "vue";
import { IonButton, IonInput, IonIcon, IonItem } from "@ionic/vue";
import { addCircleOutline, removeCircleOutline } from "ionicons/icons";

export default defineComponent({
  name: "FormMail",
  props: {
    callApi: {
      type: String,
    },
  },
  components: {
    IonButton,
    IonInput,
    IonIcon,
    IonItem,
  },

  setup() {
    return {
      addCircleOutline,
      removeCircleOutline,
    };
  },

  data() {
    return {
      emails: [{ email: "" }],
    };
  },

  methods: {
    addInput() {
      this.emails.push({ email: "" });
    },

    removeInput(index) {
      this.emails.splice(index, 1);
    },

    sendMail() {
      const listMails = JSON.parse(JSON.stringify(this.emails));

      listMails.forEach((objMail) => {
        this.$store.dispatch(this.callApi, objMail.email);
      });
      this.emails = [{ email: "" }];
    },
  },
});
</script>
