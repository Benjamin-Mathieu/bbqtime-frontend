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
            <ion-segment-button value="myEvents">
              <ion-label>Mes évènements</ion-label>
            </ion-segment-button>
          </ion-segment>
        </ion-toolbar>
      </ion-header>
      <router-link
        v-if="this.$store.getters.getLoginStatus"
        :to="{ name: 'AddEvent' }"
      >
        <ion-button size="small">Ajouter un évènement</ion-button>
      </router-link>

      <div v-if="this.selectedTypeEvent === 'public'">
        <RefreshData callApi="getPublicEvents"></RefreshData>

        <EmptyCard
          v-if="this.$store.state.events.publicEvents.length === 0"
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
            @click="redirectToManageEvent(event.id)"
          >
            <div class="img-container">
              <img alt="event-img" :src="event.photo_url" />
            </div>
            <div class="info">
              <ion-card-content>
                <ion-item>
                  <ion-label>
                    <b>{{ event.name }}</b>
                  </ion-label>
                  <ion-icon v-if="event.private" :icon="lockClosed"></ion-icon>
                </ion-item>
                <p>
                  {{ event.description }}
                </p>
                <p>
                  {{ event.zipcode + " " + event.address + " " + event.city }}
                </p>
                <div v-for="(order, index) in event.orders" :key="order.id">
                  <ion-item
                    v-if="
                      this.$store.getters.getLoginStatus &&
                      order.user_id ==
                        this.$store.getters.getUserInformation.id &&
                      index === 0
                    "
                    detail
                    :detail-icon="checkmarkCircle"
                    lines="none"
                  >
                    <p>Vous participez</p>
                  </ion-item>
                </div>
              </ion-card-content>
            </div>
          </div>
        </ion-card>
      </div>

      <div v-if="this.selectedTypeEvent === 'participated'">
        <RefreshData callApi="getParticipateEvents"></RefreshData>

        <EmptyCard
          v-if="this.$store.state.events.participateEvents.length === 0"
          text="Vous participez à aucun évènement"
        ></EmptyCard>

        <ion-card
          v-for="event in this.$store.state.events.participateEvents"
          :key="event.id"
        >
          <Skeleton v-if="loaded === false"></Skeleton>

          <div v-if="loaded === true" class="event" @click="getEvent(event.id)">
            <div class="img-container">
              <img alt="event-img" :src="event.photo_url" />
            </div>
            <div class="info">
              <ion-card-content>
                <ion-item>
                  <ion-label>
                    <b>{{ event.name }}</b>
                  </ion-label>
                  <ion-icon v-if="event.private" :icon="lockClosed"></ion-icon>
                </ion-item>
                <p>{{ event.description }}</p>
                <p>
                  {{ event.zipcode + " " + event.address + ", " + event.city }}
                </p>
              </ion-card-content>
            </div>
          </div>
        </ion-card>
      </div>

      <div v-if="this.selectedTypeEvent === 'myEvents'">
        <RefreshData callApi="getMyEvents"></RefreshData>

        <EmptyCard
          v-if="this.$store.state.events.myEvents.length === 0"
          text="Vous n'avez pas crée d'évènement"
        ></EmptyCard>

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
                        event.user_id !==
                        this.$store.getters.getUserInformation.id
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
      </div>

      <div class="pagination">
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
  IonCardContent,
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
  ellipsisHorizontalOutline,
} from "ionicons/icons";
import Header from "../components/Header.vue";
import Sub from "../components/Sub.vue";
import Footer from "../components/Footer.vue";
import RefreshData from "../components/RefreshData.vue";
import Skeleton from "../components/Skeletons/SkeletonOrder.vue";
import ShowActions from "../components/ActionSheet";
import EmptyCard from "../components/EmptyCard";

export default defineComponent({
  name: "Events",
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonCardContent,
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
      ellipsisHorizontalOutline,
    };
  },
  async ionViewWillEnter() {
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
      case "myEvents":
        this.loaded = false;
        await this.$store.dispatch("getMyEvents");
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
        case "myEvents":
          this.loaded = false;
          await this.$store.dispatch("getMyEvents");
          this.loaded = true;
          break;
      }
    },

    "$store.state.events.pagination.currentPage": function (currentPage) {
      console.log("currentPage =>", currentPage);
    },
  },
  methods: {
    async showActions(id) {
      ShowActions.event(id);
    },
    redirectToManageEvent(id) {
      this.$router.push({ name: "ManageEvent", params: { id: id } });
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
        case "myEvents":
          this.loaded = false;
          await this.$store.dispatch("getMyEvents");
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
        case "myEvents":
          this.loaded = false;
          this.$store.dispatch("getMyEvents");
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
        case "myEvents":
          this.loaded = false;
          await this.$store.dispatch("getMyEvents");
          this.loaded = true;
          break;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
ion-card {
  margin: 1em auto;
}

ion-item {
  --detail-icon-color: green;
  --detail-icon-opacity: 0.7;
  --padding-start: 0px;
}

ion-card-content {
  --padding-start: 0px;
  --padding-end: 0.5em;
}

.link {
  text-decoration: none;
}

.event {
  display: flex;
  min-height: 129px;
  .img-container {
    width: 40%;
    padding: 0.5em;
    img {
      border-radius: 5px;
      height: 100%;
      object-fit: fill;
    }
  }

  .info {
    width: 60%;
  }
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