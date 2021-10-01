<template>
  <ion-page>
    <Header></Header>
    <Sub :showShopButton="true" title="Évènements"></Sub>
    <ion-content>
      <ion-header translucent>
        <ion-toolbar>
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
      <router-link :to="{ name: 'AddEvent' }">
        <ion-button size="small" slot="end">Ajouter un évènement</ion-button>
      </router-link>
      <ion-card v-for="event in this.$store.state.publicEvents" :key="event.id">
        <ion-grid>
          <ion-row>
            <ion-col size="2">
              <img
                alt="event-img"
                :src="event.photo_url"
                style="object-fit: cover, height: 100%; width: 100%"
              />
            </ion-col>
            <ion-col size="10">
              <ion-item>
                <ion-label
                  ><b>{{ event.name }}</b></ion-label
                >
                <ion-icon v-if="event.private" :icon="lockClosed"></ion-icon>

                <router-link
                  :to="{ name: 'Categories', params: { id: event.id } }"
                >
                  <ion-button slot="end">Détails</ion-button>
                </router-link>
              </ion-item>

              <ion-card-content>
                <ion-item lines="none">
                  {{ event.description }}
                </ion-item>
                <ion-item lines="none">
                  <b>Localisation:</b>
                  {{ event.zipcode + " " + event.address + " " + event.city }}
                </ion-item>
                <div v-for="order in event.orders" :key="order.id">
                  <ion-item
                    v-if="
                      order.user_id == this.$store.getters.getUserInformation.id
                    "
                    detail
                    :detail-icon="checkmarkCircle"
                    lines="none"
                  >
                    <ion-label> Vous participez à cet évènement </ion-label>
                  </ion-item>
                </div>
              </ion-card-content>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card>
      <div v-if="this.selectedTypeEvent === 'public'" class="pagination">
        <ion-button
          v-if="this.$store.state.pagination.currentPage > 1"
          @click="prevPage()"
          fill="clear"
        >
          <ion-icon name="chevron-back" fill="clear"></ion-icon>
        </ion-button>
        <ion-button
          v-for="pages in this.$store.state.pagination.totalPages"
          :key="pages.id"
          @click="pageChange(pages)"
        >
          {{ pages }}
        </ion-button>
        <ion-button
          v-if="!this.$store.state.pagination.totalPages"
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
  IonGrid,
  IonRow,
  IonCol,
  IonHeader,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
} from "@ionic/vue";
import { lockClosed, checkmarkCircle } from "ionicons/icons";
import Header from "../components/Header.vue";
import Sub from "../components/Sub.vue";
import Footer from "../components/Footer.vue";

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
    IonGrid,
    IonRow,
    IonCol,
    IonHeader,
    IonToolbar,
    IonSegment,
    IonSegmentButton,
    Header,
    Sub,
    Footer,
  },
  data() {
    return {
      selectedTypeEvent: "public",
    };
  },
  setup() {
    return {
      lockClosed,
      checkmarkCircle,
    };
  },
  ionViewWillEnter() {
    this.$store.dispatch("getPublicEvents");
  },
  watch: {
    selectedTypeEvent() {
      this.selectedTypeEvent === "public"
        ? this.$store.dispatch("getPublicEvents")
        : this.$store.dispatch("getEvents");
    },
  },
  methods: {
    selectedValue(e) {
      this.selectedTypeEvent = e.target.value;
    },
    pageChange(page) {
      this.$store.dispatch("getPublicEvents", page);
    },
    prevPage() {
      console.log("prev page");
      let prevPage = this.$store.state.pagination.currentPage - 1;
      this.$store.dispatch("getPublicEvents", prevPage);
    },
    nextPage() {
      console.log("next page");
      let nextPage = this.$store.state.pagination.currentPage + 1;
      this.$store.dispatch("getPublicEvents", nextPage);
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
}

div .pagination {
  display: flex;
  justify-content: center;
}
</style>