<template>
  <ion-list v-if="this.$store.state.listAssociate.length > 0" inset>
    <ion-list-header>
      <ion-label color="primary">Liste associés </ion-label>
    </ion-list-header>
    <ion-item-sliding
      v-for="associate in this.$store.state.listAssociate"
      :key="associate.id"
    >
      <ion-item>
        <ion-label>
          {{
            associate.user.name +
            " " +
            associate.user.firstname +
            " | " +
            associate.user.email
          }}
        </ion-label>
      </ion-item>
      <ion-item-options>
        <ion-item-option
          @click="
            removeAssociate(
              associate.id,
              associate.user.name,
              associate.user.firstname
            )
          "
        >
          Supprimer
          <ion-icon slot="end" name="close"></ion-icon>
        </ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
  </ion-list>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
} from "@ionic/vue";
import AlertController from "../components/AlertController";

export default defineComponent({
  name: "ListAssociate",
  components: {
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonIcon,
  },

  mounted() {
    this.$store.dispatch("getListAssociate");
  },

  methods: {
    removeAssociate(id, name, firstname) {
      AlertController.validDelete(
        id,
        `Voulez-vous supprimez ${name} ${firstname} de vos associés ?`,
        "associate"
      );
    },
  },
});
</script>