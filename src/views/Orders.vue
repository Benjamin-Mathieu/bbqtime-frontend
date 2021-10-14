<template>
  <ion-page>
    <Header></Header>
    <Sub :showShopButton="true" title="Vos commandes"></Sub>
    <ion-content>
      <RefreshData callApi="getOrders"></RefreshData>
      <ion-card v-for="order in this.$store.state.orders" :key="order.id">
        <Skeleton v-if="loaded === false"></Skeleton>

        <div v-if="loaded === true" class="event">
          <div class="img-container">
            <img alt="event-img" :src="order.event.photo_url" />
          </div>

          <div class="preview-container">
            <ion-card-title>
              <h5>{{ order.event.name }}</h5>
            </ion-card-title>
            <ion-card-content class="preview">
              <p>
                {{ order.description }}
                <b>Localisation:</b>
                {{
                  order.event.zipcode +
                  " " +
                  order.event.address +
                  " " +
                  order.event.city
                }}
              </p>
              <p><b>Total</b> {{ order.cost + " €" }}</p>
              <ion-item lines="none">
                <ion-button
                  slot="end"
                  size="small"
                  @click="toggleDetails(order.id)"
                >
                  <ion-icon :icon="chevronDownOutline"></ion-icon>
                </ion-button>
              </ion-item>
            </ion-card-content>
          </div>
        </div>
        <div
          class="detail-order"
          v-for="showDetail in this.showDetails"
          :key="showDetail.id"
        >
          <div v-if="showDetail.id == order.id && showDetail.show">
            <ion-list
              v-for="orderplat in order.orders_plats"
              :key="orderplat.id"
              lines="none"
            >
              <ion-list-header lines="inset">
                <ion-label>Plats commandés</ion-label>
              </ion-list-header>
              <ion-item>
                <ion-avatar slot="start">
                  <img :src="orderplat.plat.photo_url" alt="img-plat" />
                </ion-avatar>
                <ion-label>
                  {{ orderplat.plat.libelle }}
                </ion-label>
                <ion-badge slot="end">
                  {{ orderplat.quantity }}
                </ion-badge>
              </ion-item>
            </ion-list>
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
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonItem,
  IonList,
  IonListHeader,
  IonAvatar,
  IonBadge,
  IonLabel,
  IonButton,
} from "@ionic/vue";
import { chevronDownOutline } from "ionicons/icons";
import Sub from "../components/Sub.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import RefreshData from "../components/RefreshData.vue";
import Skeleton from "../components/Skeletons/SkeletonOrder.vue";

export default defineComponent({
  name: "Orders",
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonCardTitle,
    IonCardContent,
    IonIcon,
    IonItem,
    IonList,
    IonListHeader,
    IonAvatar,
    IonBadge,
    IonLabel,
    IonButton,
    Header,
    Sub,
    Footer,
    RefreshData,
    Skeleton,
  },
  setup() {
    return {
      chevronDownOutline,
    };
  },
  data() {
    return {
      showDetails: [],
      loaded: false,
    };
  },
  async ionViewWillEnter() {
    await this.$store.dispatch("getOrders");
    this.loaded = true;
  },
  ionViewDidEnter() {
    this.$store.state.orders.forEach((order) => {
      this.showDetails.push({ id: order.id, show: false });
    });
  },
  ionViewWillLeave() {
    this.showDetails = [];
  },
  methods: {
    getDetails(orderId) {
      this.$store.dispatch("getOrderDetails", { id: orderId });
    },
    toggleDetails(id) {
      this.showDetails.forEach((element) => {
        if (element.id === id) {
          element.show = !element.show;
        }
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.event {
  display: flex;

  .img-container {
    width: 30%;
    padding: 0.5em;
    img {
      border-radius: 5px;
      height: 100%;
    }
  }

  .preview-container {
    padding: 0.5em;
    width: 70%;
    .preview {
      padding: 0px;
    }
  }
}
</style>