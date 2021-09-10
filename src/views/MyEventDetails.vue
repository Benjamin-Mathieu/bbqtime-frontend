<template>
  <ion-page>
    <ion-content>
      <h1>Mes évènements</h1>
      <h1>Mes évènements</h1>
      <h1>Organisation</h1>

      <ion-card class="commandes">
        <ion-card-header>
          <ion-card-title>Commandes</ion-card-title>
        </ion-card-header>
        <ion-card
          v-for="plat in this.$store.state.myEventDetails.plats"
          :key="plat.id"
        >
          <ion-grid>
            <ion-row>
              <ion-col size="2">
                <ion-img alt="plat-img" :src="plat.public_img"></ion-img>
              </ion-col>
              <ion-col size="10">
                <ion-item>
                  <ion-label>{{ plat.libelle }}</ion-label>
                  <ion-badge slot="end">{{ plat.quantity }}</ion-badge>
                </ion-item>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card>
      </ion-card>

      <ion-card class="budget">
        <ion-card-header>
          <ion-card-title>Budget</ion-card-title>
        </ion-card-header>
        <ion-card
          v-for="plat in this.$store.state.myEventDetails.plats"
          :key="plat.id"
        >
          <ion-grid>
            <ion-row>
              <ion-col size="2">
                <ion-img alt="plat-img" :src="plat.public_img"></ion-img>
              </ion-col>
              <ion-col size="10">
                <ion-item>
                  <ion-label>{{ plat.libelle }}</ion-label>
                  <ion-item slot="end">{{ plat.total }} €</ion-item>
                </ion-item>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-card>
        <ion-item-divider color="primary">
          <ion-label>
            Montant total: {{ this.$store.state.myEventDetails.totalBudget }} €
          </ion-label>
        </ion-item-divider>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
// import { IonCard, IonCardContent, IonItem, IonButton } from "@ionic/vue";

export default defineComponent({
  name: "MyEventDetails",
  mounted() {
    this.$store.dispatch("getMyEventDetails", this.$route.params.id);
  },
});
</script>
<style>
.commandes,
.budget {
  width: 80%;
  margin: auto;
}
</style>