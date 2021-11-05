<template>
  <ion-page>
    <Header></Header>
    <Sub :showShopButton="true" title="Vos commandes"></Sub>
    <ion-content>
      <div v-if="this.$store.state.orders.length === 0 && loaded === true">
        <ion-card>
          <ion-card-title>
            <h5 style="text-align: center">Pas de commande à afficher</h5>
          </ion-card-title>
        </ion-card>
      </div>
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
              </p>
              <p>Localisation:</p>
              <p>
                {{ order.event.zipcode }}
              </p>
              <p>{{ order.event.address + " " + order.event.city }}</p>
              <ion-item lines="none">
                <ion-button size="small" @click="toggleDetails(order.id)">
                  <div
                    v-for="showDetail in this.showDetails"
                    :key="showDetail.id"
                  >
                    <ion-icon
                      v-if="showDetail.id === order.id && showDetail.activeIcon"
                      :icon="chevronDownOutline"
                    >
                    </ion-icon>
                    <ion-icon
                      v-if="
                        showDetail.id === order.id && !showDetail.activeIcon
                      "
                      :icon="chevronForwardOutline"
                    >
                    </ion-icon>
                  </div>
                </ion-button>
              </ion-item>
            </ion-card-content>
          </div>
        </div>

        <div v-for="showDetail in this.showDetails" :key="showDetail.id">
          <transition name="fade">
            <div v-if="showDetail.id == order.id && showDetail.show">
              <ion-list-header lines="inset">
                <ion-label color="primary">Plats commandés</ion-label>
              </ion-list-header>
              <div class="list-plats">
                <ion-list
                  v-for="orderplat in order.orders_plats"
                  :key="orderplat.id"
                  lines="none"
                >
                  <ion-item>
                    <ion-avatar slot="start">
                      <img :src="orderplat.plat.photo_url" alt="img-plat" />
                    </ion-avatar>
                    <ion-label color="primary">
                      {{
                        orderplat.plat.libelle +
                        ": " +
                        orderplat.plat.price +
                        "€"
                      }}
                    </ion-label>
                    <ion-badge slot="end">
                      {{ orderplat.quantity }}
                    </ion-badge>
                  </ion-item>
                </ion-list>
              </div>
              <div class="total">
                <p>Total commande: {{ order.cost }} €</p>
              </div>
            </div>
          </transition>
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
import { chevronForwardOutline, chevronDownOutline } from "ionicons/icons";
import Sub from "../components/Sub.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import RefreshData from "../components/RefreshData.vue";
import Skeleton from "../components/Skeletons/SkeletonEvent.vue";

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

  data() {
    return {
      showDetails: [],
      loaded: false,
    };
  },

  setup() {
    return {
      chevronForwardOutline,
      chevronDownOutline,
    };
  },

  async ionViewWillEnter() {
    await this.$store.dispatch("getOrders");
    this.$store.state.orders.forEach((order) => {
      this.showDetails.push({
        id: order.id,
        show: false,
        activeIcon: false,
      });
    });
    this.loaded = true;
  },

  ionViewWillLeave() {
    this.showDetails = [];
  },

  methods: {
    getDetails(orderId) {
      this.$store.dispatch("getOrderDetails", { id: orderId });
    },

    toggleDetails(id) {
      let showDetail = this.showDetails.find((detail) => detail.id === id);
      showDetail.show = !showDetail.show;
      showDetail.activeIcon = !showDetail.activeIcon;
      console.log("showdetails => ", this.showDetails);
    },
  },
});
</script>

<style lang="scss" scoped>
.event {
  display: flex;

  .img-container {
    width: 40%;
    padding: 0.5em;
    img {
      border-radius: 5px;
      height: 100%;
      object-fit: fill;
    }
  }

  .preview-container {
    padding: 0.5em;
    width: 60%;
    .preview {
      padding: 0px;
    }
    ion-button {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
}

.total {
  text-align: right;
  padding-right: 1em;
  p {
    color: #751417;
    font-weight: bold;
    font-size: 1.2em;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>