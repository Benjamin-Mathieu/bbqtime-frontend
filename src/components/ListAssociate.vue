<template>
  <ion-list>
    <ion-list-header>
      <ion-label color="primary">Liste associés </ion-label>
    </ion-list-header>
    <div v-if="associateInEvent">
      <ion-item-sliding
        v-for="associate in this.$store.state.listAssociate"
        :key="associate.id"
      >
        <ion-item>
          <ion-label>
            {{ associate.user.firstname + " | " + associate.user.email }}
          </ion-label>
        </ion-item>
        <ion-item-options>
          <ion-item-option @click="removeAssociate(associate.id)">
            Supprimer
            <ion-icon slot="end" name="close"></ion-icon>
          </ion-item-option>
        </ion-item-options>
      </ion-item-sliding>
    </div>
    <ion-item v-else>
      <ion-label>Aucun associé pour le moment</ion-label>
    </ion-item>
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

  computed: {
    associateInEvent() {
      return this.$store.state.listAssociate.length > 0 ? true : false;
    },
  },

  methods: {
    removeAssociate(id) {
      AlertController.validDelete(id, `Êtes-vous sûr ?`, "associate");
    },
  },
});
</script>