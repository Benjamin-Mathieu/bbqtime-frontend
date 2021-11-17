<template>
  <ion-page>
    <Header></Header>
    <Sub :showShopButton="true" title="Évènements"></Sub>
    <ion-content>
      <ion-header translucent>
        <ion-toolbar v-if="this.$store.getters.getLoginStatus">
          <ion-segment
            :value="selectedTypeEvent"
            @ionChange="selectedValue($event)"
          >
            <ion-segment-button value="public">
              <ion-label>Publiques</ion-label>
            </ion-segment-button>
            <ion-segment-button value="participated">
              <ion-label>Participés</ion-label>
            </ion-segment-button>
          </ion-segment>
        </ion-toolbar>
      </ion-header>

      <div class="public-events" v-if="this.selectedTypeEvent === 'public'">
        <RefreshData callApi="getPublicEvents"></RefreshData>

        <EmptyCard
          v-if="
            this.$store.state.events.publicEvents.length === 0 &&
            loaded === true
          "
          text="Pas d'évènements publiques à afficher"
        ></EmptyCard>

        <ion-card
          v-for="event in this.$store.state.events.publicEvents"
          :key="event.id"
        >
          <Skeleton v-if="loaded === false"></Skeleton>

          <div
            v-if="loaded === true"
            class="event"
            @click="redirectToEvent(event.id)"
          >
            <div class="img-container">
              <img alt="event-img" :src="event.photo_url" />
            </div>
            <div class="info">
              <b>{{ event.name }}</b>
              <p>
                {{ event.description }}
              </p>
              <p>
                {{ event.address + ", " + event.zipcode + " " + event.city }}
              </p>
              <div
                class="participate"
                v-for="eventId in arrayOfIdsEventOrder"
                :key="eventId.id"
              >
                <ion-item
                  v-if="
                    this.$store.getters.getLoginStatus && event.id === eventId
                  "
                  detail
                  :detail-icon="checkmarkCircle"
                  lines="none"
                >
                  <p>Vous participez</p>
                </ion-item>
              </div>
            </div>
          </div>
        </ion-card>
      </div>

      <div
        class="participate-events"
        v-if="
          this.selectedTypeEvent === 'participated' &&
          this.$store.state.auth.userIsLoggedIn
        "
      >
        <RefreshData callApi="getParticipateEvents"></RefreshData>

        <EmptyCard
          v-if="
            this.$store.state.events.participateEvents.length === 0 &&
            loaded === true
          "
          text="Vous participez à aucun évènement"
        ></EmptyCard>

        <ion-card
          v-for="event in this.$store.state.events.participateEvents"
          :key="event.id"
        >
          <Skeleton v-if="loaded === false"></Skeleton>

          <div
            v-if="loaded === true"
            class="event"
            @click="redirectToEvent(event.id)"
          >
            <div class="img-container">
              <img alt="event-img" :src="event.photo_url" />
            </div>
            <div class="info">
              <b>{{ event.name }}</b>
              <ion-icon v-if="event.private" :icon="lockClosed"></ion-icon>
              <p>{{ event.description }}</p>
              <p>
                {{ event.address + ", " + event.zipcode + " " + event.city }}
              </p>
            </div>
          </div>
        </ion-card>
      </div>

      <div class="add-event-button">
        <router-link
          v-if="this.$store.getters.getLoginStatus"
          :to="{ name: 'AddEvent' }"
        >
          <ion-button size="small">Ajouter un évènement</ion-button>
        </router-link>
      </div>

      <div v-if="loaded === true" class="pagination">
        <ion-button
          v-if="this.$store.state.events.pagination.currentPage > 1"
          @click="prevPage()"
          size="small"
          fill="clear"
        >
          <ion-icon name="chevron-back" fill="clear"></ion-icon>
        </ion-button>
        <div
          v-for="pages in this.$store.state.events.pagination.totalPages"
          :key="pages"
          @click="pageChange(pages)"
        >
          <p
            :class="{
              'is-current-page':
                pages === this.$store.state.events.pagination.currentPage,
            }"
          >
            {{ pages }}
          </p>
        </div>
        <ion-button
          v-if="
            this.$store.state.events.pagination.currentPage <
            this.$store.state.events.pagination.totalPages
          "
          @click="nextPage()"
          size="small"
          fill="clear"
        >
          <ion-icon name="chevron-forward" fill="clear"></ion-icon>
        </ion-button>
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
  IonCard,
  IonIcon,
  IonItem,
  IonLabel,
  IonButton,
  IonHeader,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
} from "@ionic/vue";
import {
  lockClosed,
  checkmarkCircle,
  copyOutline,
  ellipsisVertical,
} from "ionicons/icons";
import Header from "../components/Header.vue";
import Sub from "../components/Sub.vue";
import Footer from "../components/Footer.vue";
import RefreshData from "../components/RefreshData.vue";
import Skeleton from "../components/Skeletons/SkeletonEvent.vue";
import ShowActions from "../components/ActionSheet";
import EmptyCard from "../components/EmptyCard";

export default defineComponent({
  name: "Events",
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonIcon,
    IonItem,
    IonLabel,
    IonButton,
    IonHeader,
    IonToolbar,
    IonSegment,
    IonSegmentButton,
    Header,
    Sub,
    Footer,
    Skeleton,
    RefreshData,
    EmptyCard,
  },

  data() {
    return {
      selectedTypeEvent: "public",
      loaded: false,
    };
  },

  setup() {
    return {
      lockClosed,
      checkmarkCircle,
      copyOutline,
      ellipsisVertical,
    };
  },

  async ionViewWillEnter() {
    if (this.$store.state.auth.userIsLoggedIn)
      this.$store.dispatch("getOrders");

    switch (this.selectedTypeEvent) {
      case "public":
        this.loaded = false;
        await this.$store.dispatch("getPublicEvents");
        this.loaded = true;
        break;
      case "participated":
        this.loaded = false;
        await this.$store.dispatch("getParticipateEvents");
        this.loaded = true;
        break;
    }
  },

  watch: {
    async selectedTypeEvent() {
      switch (this.selectedTypeEvent) {
        case "public":
          this.loaded = false;
          await this.$store.dispatch("getPublicEvents");
          this.loaded = true;
          break;
        case "participated":
          this.loaded = false;
          await this.$store.dispatch("getParticipateEvents");
          this.loaded = true;
          break;
      }
    },
  },

  computed: {
    arrayOfIdsEventOrder() {
      let value = [];
      this.$store.state.orders.forEach((order) => {
        value.push(order.event_id);
      });
      let filtered_array = [...new Set(value.map((item) => item))];

      return filtered_array;
    },
  },

  methods: {
    async showActions(id) {
      ShowActions.event(id);
    },

    redirectToEvent(id) {
      this.$router.push({ name: "Categories", params: { id: id } });
    },

    selectedValue(e) {
      this.selectedTypeEvent = e.target.value;
    },

    async pageChange(page) {
      switch (this.selectedTypeEvent) {
        case "public":
          this.loaded = false;
          await this.$store.dispatch("getPublicEvents", page);
          this.loaded = true;

          break;
        case "participated":
          this.loaded = false;
          await this.$store.dispatch("getParticipateEvents", page);
          this.loaded = true;

          break;
      }
    },

    async prevPage() {
      let prevPage = this.$store.state.events.pagination.currentPage - 1;
      switch (this.selectedTypeEvent) {
        case "public":
          this.loaded = false;
          await this.$store.dispatch("getPublicEvents", prevPage);
          this.loaded = true;
          break;
        case "participated":
          this.loaded = false;
          await this.$store.dispatch("getParticipateEvents", prevPage);
          this.loaded = true;
          break;
      }
    },

    async nextPage() {
      let nextPage = this.$store.state.events.pagination.currentPage + 1;
      switch (this.selectedTypeEvent) {
        case "public":
          this.loaded = false;
          await this.$store.dispatch("getPublicEvents", nextPage);
          this.loaded = true;
          break;
        case "participated":
          this.loaded = false;
          await this.$store.dispatch("getParticipateEvents", nextPage);
          this.loaded = true;
          break;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
ion-toolbar {
  padding-top: 0px !important;
}

ion-item {
  --detail-icon-color: green;
  --detail-icon-opacity: 0.7;
  --padding-start: 0px;
}

ion-card-content,
ion-card-content-ios {
  --padding-start: 0px;
  --padding-end: 0.5em;
  height: 130px;
}

.link {
  text-decoration: none;
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
      color: #7e2727;
      margin: 0px;
      padding-right: 1em;
    }

    .participate {
      position: absolute;
      top: -10px;
      right: -10px;
      p {
        font-size: 12px;
      }
    }
  }
}

.add-event-button {
  text-align: center;
}

div .pagination {
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    margin: 0 0.5em;
    width: 2em;
    p {
      text-align: center;
      color: #7e2727;
    }
    .is-current-page {
      border-radius: 5px;
      background-color: #9c544d;
      color: whitesmoke;
    }
  }
}
</style>