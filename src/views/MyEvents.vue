<template>
  <ion-page>
    <Header></Header>
    <Sub title="Mes évènements"></Sub>
    <ion-content>
      <ion-header translucent>
        <ion-toolbar>
          <ion-segment :value="selectedTab" @ionChange="selectedValue($event)">
            <ion-segment-button value="inprogress">
              <ion-label>En cours</ion-label>
            </ion-segment-button>
            <ion-segment-button value="archived">
              <ion-label>Archivés</ion-label>
            </ion-segment-button>
          </ion-segment>
        </ion-toolbar>
      </ion-header>

      <div
        class="no-event"
        v-if="
          loaded === true &&
          selectedTab === 'inprogress' &&
          this.$store.state.events.myEvents.length === 0
        "
      >
        <EmptyCard text="Vous n'avez pas encore crée d'évènement"></EmptyCard>
        <router-link :to="{ name: 'AddEvent' }">
          <ion-button> Crée un évènement </ion-button>
        </router-link>
      </div>

      <div
        class="no-event"
        v-if="
          loaded === true &&
          selectedTab === 'archived' &&
          this.$store.state.events.archivedEvents.length === 0
        "
      >
        <EmptyCard text="Pas d'évènement archivés pour le moment"></EmptyCard>
      </div>

      <div
        class="inprogress-events"
        v-if="
          selectedTab === 'inprogress' &&
          this.$store.state.events.myEvents.length > 0
        "
      >
        <RefreshData callApi="getMyEvents"></RefreshData>
        <ion-card
          v-for="event in this.$store.state.events.myEvents"
          :key="event.id"
        >
          <Skeleton v-if="loaded === false"></Skeleton>

          <div
            @click="redirectToManageEvent(event.id)"
            v-if="loaded === true"
            class="event"
          >
            <div class="img-container">
              <img alt="event-img" :src="event.photo_url" />
            </div>
            <div class="info">
              <div class="actions-button">
                <ion-button
                  @click.stop="showActions(event.id)"
                  fill="clear"
                  size="small"
                >
                  <ion-icon :icon="ellipsisVertical"></ion-icon>
                </ion-button>
              </div>
              <b>{{ event.name }}</b>
              <p
                v-if="
                  event.user_id !== this.$store.getters.getUserInformation.id
                "
              >
                Associé
              </p>
              <p>
                {{ event.description }}
              </p>
              <p>
                {{ event.zipcode + " " + event.address + " " + event.city }}
              </p>
            </div>
          </div>
        </ion-card>
      </div>

      <div class="archived-events" v-if="selectedTab === 'archived'">
        <RefreshData callApi="getArchivedEvents"></RefreshData>
        <ion-card
          v-for="event in this.$store.state.events.archivedEvents"
          :key="event.id"
        >
          <Skeleton v-if="loaded === false"></Skeleton>

          <div v-if="loaded === true" class="event">
            <div class="img-container">
              <img alt="event-img" :src="event.photo_url" />
            </div>
            <div class="info">
              <b>{{ event.name }}</b>
              <p
                v-if="
                  event.user_id !== this.$store.getters.getUserInformation.id
                "
              >
                Associé
              </p>
              <p>
                {{ event.description }}
              </p>
              <p>
                {{ event.zipcode + " " + event.address + " " + event.city }}
              </p>
            </div>
          </div>
        </ion-card>
      </div>
    </ion-content>
    <Footer></Footer>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonPage,
  IonContent,
  IonIcon,
  IonCard,
  IonButton,
  IonHeader,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from "@ionic/vue";
import EmptyCard from "../components/EmptyCard.vue";
import Sub from "../components/Sub.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import RefreshData from "../components/RefreshData.vue";
import Skeleton from "../components/Skeletons/SkeletonEvent.vue";
import { copyOutline, ellipsisVertical } from "ionicons/icons";
import ShowActions from "../components/ActionSheet";

export default defineComponent({
  name: "MyEvents",
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonIcon,
    IonCard,
    IonButton,
    EmptyCard,
    Sub,
    Header,
    Footer,
    RefreshData,
    Skeleton,
  },

  data() {
    return {
      loaded: false,
      selectedTab: "inprogress",
    };
  },

  setup() {
    return { copyOutline, ellipsisVertical };
  },

  async ionViewWillEnter() {
    await this.$store.dispatch("getMyEvents");
    this.loaded = true;
  },

  watch: {
    async selectedTab() {
      this.loaded = false;

      if (this.selectedTab === "inprogress") {
        await this.$store.dispatch("getMyEvents");
        this.loaded = true;
      }

      if (this.selectedTab === "archived") {
        await this.$store.dispatch("getArchivedEvents");
        this.loaded = true;
      }
    },
  },

  methods: {
    async showActions(id) {
      ShowActions.event(id);
    },

    redirectToManageEvent(id) {
      this.$router.push({
        name: "ManageEvent",
        params: { id: id },
      });
    },

    selectedValue(e) {
      this.selectedTab = e.target.value;
    },
  },
});
</script>

<style lang="scss" scoped>
ion-toolbar {
  padding-top: 0px !important;
}

ion-item {
  --padding-start: 0px;
}

ion-card-content,
ion-card-content-ios {
  --padding-start: 0px;
  --padding-top: 0px;
  --padding-end: 0.5em;
  height: 130px;
}

.no-event {
  text-align: center;
}

.event {
  display: flex;
  height: 130px;

  .img-container {
    width: 40%;
    padding: 0.5em;
    img {
      border-radius: 5px;
      height: 100%;
      width: 100%;
      object-fit: fill;
    }
  }

  .info {
    width: 60%;
    padding: 1em 0;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    b {
      color: #7e2727;
    }

    p {
      color: #7f2928;
      margin: 0px;
      padding-right: 1em;
    }

    .actions-button {
      position: absolute;
      right: -10px;
      top: 0px;
    }
  }
}
</style>