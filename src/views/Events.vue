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
      <router-link
        v-if="this.$store.getters.getLoginStatus"
        :to="{ name: 'AddEvent' }"
      >
        <ion-button size="small" slot="end">Ajouter un évènement</ion-button>
      </router-link>

      <div v-if="this.selectedTypeEvent === 'public'">
        <RefreshData callApi="getPublicEvents"></RefreshData>
        <ion-card
          v-for="event in this.$store.state.events.publicEvents"
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
                <p>
                  {{ event.description }}
                </p>
                <p>
                  {{ event.zipcode + " " + event.address + " " + event.city }}
                </p>
                <!-- <div v-for="order in event.orders" :key="order.id">
                  <ion-item
                    v-if="
                      this.$store.getters.getLoginStatus &&
                      order.user_id == this.$store.getters.getUserInformation.id
                    "
                    detail
                    :detail-icon="checkmarkCircle"
                    lines="none"
                  >
                    <p>Vous participez à cet évènement</p>
                  </ion-item>
                </div> -->
              </ion-card-content>
            </div>
          </div>
        </ion-card>
      </div>

      <div v-if="this.selectedTypeEvent === 'participated'">
        <RefreshData callApi="getParticipateEvents"></RefreshData>
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
          fill="clear"
        >
          <ion-icon name="chevron-back" fill="clear"></ion-icon>
        </ion-button>
        <ion-button
          v-for="pages in this.$store.state.events.pagination.totalPages"
          :key="pages.id"
          @click="pageChange(pages)"
        >
          {{ pages }}
        </ion-button>
        <ion-button
          v-if="!this.$store.state.events.pagination.totalPages"
          @click="nextPage()"
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
import { lockClosed, checkmarkCircle } from "ionicons/icons";
import Header from "../components/Header.vue";
import Sub from "../components/Sub.vue";
import Footer from "../components/Footer.vue";
import RefreshData from "../components/RefreshData.vue";
import Skeleton from "../components/Skeletons/SkeletonEvent.vue";

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
    };
  },
  async ionViewWillEnter() {
    await this.$store.dispatch("getPublicEvents");
    this.loaded = true;
  },
  watch: {
    selectedTypeEvent() {
      this.selectedTypeEvent === "public"
        ? this.$store.dispatch("getPublicEvents")
        : this.$store.dispatch("getParticipateEvents");
    },
  },
  methods: {
    getEvent(id) {
      this.$router.push({ name: "Categories", params: { id: id } });
    },
    selectedValue(e) {
      this.selectedTypeEvent = e.target.value;
    },
    pageChange(page) {
      this.selectedTypeEvent === "public"
        ? this.$store.dispatch("getPublicEvents", page)
        : this.$store.dispatch("getParticipateEvents", page);
    },
    prevPage() {
      let prevPage = this.$store.state.events.pagination.currentPage - 1;
      this.selectedTypeEvent === "public"
        ? this.$store.dispatch("getPublicEvents", prevPage)
        : this.$store.dispatch("getParticipateEvents", prevPage);
    },
    nextPage() {
      let nextPage = this.$store.state.events.pagination.currentPage + 1;
      this.selectedTypeEvent === "public"
        ? this.$store.dispatch("getPublicEvents", nextPage)
        : this.$store.dispatch("getParticipateEvents", nextPage);
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

.link {
  text-decoration: none;
}

.event {
  display: flex;
  min-height: 129px;
  .img-container {
    width: 30%;
    padding: 0.5em;
    img {
      border-radius: 5px;
      height: 100%;
      object-fit: fill;
    }
  }

  .info {
    width: 70%;
  }
}

div .pagination {
  display: flex;
  justify-content: center;
}
</style>