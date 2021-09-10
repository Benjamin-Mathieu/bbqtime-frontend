<template>
  <ion-page>
    <ion-content>
      <h1>Mes évènements</h1>
      <h1>Mes évènements</h1>
      <h1>Mes évènements</h1>

      <ion-card v-for="event in this.$store.state.myEvents" :key="event.id">
        <ion-grid>
          <ion-row>
            <ion-col size="2">
              <ion-img alt="event-img" :src="event.public_img"></ion-img>
            </ion-col>
            <ion-col size="10">
              <ion-item>
                <ion-label
                  ><b>{{ event.name }}</b> ID {{ event.id }}
                </ion-label>

                <ion-button fill="outline" slot="end"
                  ><router-link
                    :to="{ name: 'MyEventDetails', params: { id: event.id } }"
                    >Details
                  </router-link>
                </ion-button>
              </ion-item>
              <ion-card-content>
                <p>
                  {{ event.description }}
                </p>
                <p>
                  <b>Localisation:</b>
                  {{ event.zipcode + " " + event.address + " " + event.city }}
                </p>
              </ion-card-content>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
// import { IonCard, IonCardContent, IonItem, IonButton } from "@ionic/vue";

export default defineComponent({
  name: "MyEvents",
  components: {},
  mounted() {
    this.$store.dispatch("getMyEvents");
  },
});
</script>
<style>
</style>