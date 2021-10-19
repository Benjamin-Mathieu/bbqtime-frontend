<template>
  <ion-page>
    <Header></Header>
    <Sub title="Mes évènements"></Sub>
    <ion-content>
      <RefreshData callApi="getMyEvents"></RefreshData>
      <ion-card
        v-for="event in this.$store.state.events.myEvents"
        :key="event.id"
      >
        <Skeleton v-if="loaded === false"></Skeleton>

        <div
          @click="
            this.$router.push({
              name: 'MyEventDetails',
              params: { id: event.id },
            })
          "
          v-if="loaded === true"
          class="event"
        >
          <div class="img-container">
            <img alt="event-img" :src="event.photo_url" />
          </div>
          <div class="info">
            <ion-card-content>
              <ion-item>
                <ion-label>
                  <b>{{ event.name }}</b>
                  <p
                    v-if="
                      event.user_id !== this.$store.getters.getUserInformation.id
                    "
                  >
                    Associé
                  </p>
                </ion-label>
                <ion-button
                  @click.stop="showActions(event.id)"
                  slot="end"
                  size="small"
                >
                  <ion-icon :icon="ellipsisHorizontalOutline"></ion-icon>
                </ion-button>
              </ion-item>
              <p>
                {{ event.description }}
              </p>
              <p>
                {{ event.zipcode + " " + event.address + " " + event.city }}
              </p>
            </ion-card-content>
          </div>
        </div>
      </ion-card>
    </ion-content>
    <Footer></Footer>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonPage,
  IonContent,
  IonLabel,
  IonIcon,
  IonCard,
  IonCardContent,
  IonItem,
  IonButton,
} from "@ionic/vue";
import Sub from "../components/Sub.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import RefreshData from "../components/RefreshData.vue";
import Skeleton from "../components/Skeletons/SkeletonEvent.vue";
import { copyOutline, ellipsisHorizontalOutline } from "ionicons/icons";
import ShowActions from "../components/ActionSheet";

export default defineComponent({
  name: "MyEvents",
  components: {
    IonPage,
    IonContent,
    IonLabel,
    IonIcon,
    IonCard,
    IonCardContent,
    IonItem,
    IonButton,
    Sub,
    Header,
    Footer,
    RefreshData,
    Skeleton,
  },
  data() {
    return {
      loaded: false,
    };
  },
  setup() {
    return { copyOutline, ellipsisHorizontalOutline };
  },
  async ionViewWillEnter() {
    await this.$store.dispatch("getMyEvents");
    this.loaded = true;
  },
  methods: {
    async showActions(id) {
      ShowActions.event(id);
    },
  },
});
</script>

<style lang="scss" scoped>
ion-item {
  --padding-start: 0px;
}

.event {
  display: flex;
  .img-container {
    width: 35%;
    padding: 0.5em;
    img {
      border-radius: 5px;
      height: 100%;
      object-fit: fill;
    }
  }

  .info {
    width: 65%;
  }
}
</style>