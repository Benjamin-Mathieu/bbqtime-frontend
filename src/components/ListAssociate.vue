<template>
  <ion-list v-if="this.$store.state.listAssociate.length > 0" inset>
    <ion-list-header>
      <ion-label color="primary">Liste associés </ion-label>
    </ion-list-header>
    <ion-item
      v-for="associate in this.$store.state.listAssociate"
      :key="associate.id"
    >
      <ion-label>
        {{
          associate.name + " " + associate.firstname + " | " + associate.email
        }}
      </ion-label>
    </ion-item>
  </ion-list>
</template>

<script>
import { defineComponent } from "vue";
import { IonList, IonListHeader, IonItem, IonLabel } from "@ionic/vue";

export default defineComponent({
  name: "ListAssociate",
  components: { IonList, IonListHeader, IonItem, IonLabel },

  mounted() {
    this.$store.dispatch("getListAssociate");
  },
});
</script>