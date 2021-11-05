<template>
  <ion-page>
    <Header></Header>
    <Sub :title="'Détails / ' + nameEvent"></Sub>
    <ion-content>
      <div id="container">
        <RefreshData callApi="getMyEventOrders"></RefreshData>
        <ion-segment :value="tab">
          <ion-segment-button @click="this.tab = 'gestion'" value="gestion">
            <ion-label>Gestion</ion-label>
          </ion-segment-button>
          <ion-segment-button @click="this.tab = 'budget'" value="budget">
            <ion-label>Budget</ion-label>
          </ion-segment-button>
        </ion-segment>

        <ion-card
          v-if="
            Object.keys(this.$store.state.events.myEventOrders).length === 0
          "
        >
          <ion-card-header> Pas de commande en cours </ion-card-header>
        </ion-card>

        <ion-card
          v-if="
            this.tab === 'gestion' &&
            Object.keys(this.$store.state.events.myEventOrders).length > 0
          "
          class="details"
        >
          <ion-card-header>
            <ion-segment :value="toggleStatusOrder">
              <ion-segment-button
                @click="this.toggleStatusOrder = 'pending'"
                value="pending"
              >
                <ion-label>En cours</ion-label>
              </ion-segment-button>
              <ion-segment-button
                @click="this.toggleStatusOrder = 'prepared'"
                value="prepared"
              >
                <ion-label>Préparer</ion-label>
              </ion-segment-button>
              <ion-segment-button
                @click="this.toggleStatusOrder = 'delivered'"
                value="delivered"
              >
                <ion-label>Livrer</ion-label>
              </ion-segment-button>
            </ion-segment>
          </ion-card-header>

          <ion-list
            v-for="order in this.$store.state.events.myEventOrders"
            :key="order.id"
            class="orders"
          >
            <div
              class="pending-orders"
              v-if="order.status === 0 && this.toggleStatusOrder === 'pending'"
            >
              <ion-item-divider color="primary">
                <ion-label> Commande n° {{ order.id }} </ion-label>
              </ion-item-divider>
              <ion-list-header>
                {{ order.user.firstname }} {{ order.user.name }}
              </ion-list-header>
              <ion-list>
                <div
                  v-for="orderPlat in order.orders_plats"
                  :key="orderPlat.id"
                >
                  <ion-item>
                    {{ orderPlat.plat.libelle }}
                    <ion-badge slot="end">{{ orderPlat.quantity }}</ion-badge>
                  </ion-item>
                </div>
              </ion-list>

              <ion-item lines="none">
                <ion-label>Status</ion-label>
                <ion-select
                  ok-text="Valider"
                  cancel-text="Fermer"
                  v-model="order.status"
                  @ionChange="selectedValue($event, order.id)"
                >
                  <ion-select-option :value="1">Préparer</ion-select-option>
                  <ion-select-option :value="2">Livrer</ion-select-option>
                </ion-select>
              </ion-item>
            </div>

            <div
              class="prepared-orders"
              v-if="order.status === 1 && this.toggleStatusOrder === 'prepared'"
            >
              <ion-item-divider color="primary">
                <ion-label> Commande n° {{ order.id }} </ion-label>
              </ion-item-divider>
              <ion-list-header>
                {{ order.user.firstname }} {{ order.user.name }}
              </ion-list-header>
              <ion-list>
                <div
                  v-for="orderPlat in order.orders_plats"
                  :key="orderPlat.id"
                >
                  <ion-item lines="none">
                    {{ orderPlat.plat.libelle }}
                    <ion-badge slot="end">{{ orderPlat.quantity }}</ion-badge>
                  </ion-item>
                </div>
              </ion-list>
              <ion-item lines="none">
                <ion-label>Status</ion-label>
                <ion-select
                  ok-text="Valider"
                  cancel-text="Fermer"
                  v-model="order.status"
                  @ionChange="selectedValue($event, order.id)"
                >
                  <ion-select-option :value="2">Livré</ion-select-option>
                </ion-select>
              </ion-item>
            </div>

            <div
              class="delivered-orders"
              v-if="
                order.status === 2 && this.toggleStatusOrder === 'delivered'
              "
            >
              <ion-item-divider color="primary">
                <ion-label> Commande n° {{ order.id }} </ion-label>
              </ion-item-divider>
              <ion-list-header>
                {{ order.user.firstname }} {{ order.user.name }}
              </ion-list-header>
              <ion-list>
                <div
                  v-for="orderPlat in order.orders_plats"
                  :key="orderPlat.id"
                >
                  <ion-item lines="none">
                    {{ orderPlat.plat.libelle }}
                    <ion-badge slot="end">{{ orderPlat.quantity }}</ion-badge>
                  </ion-item>
                </div>
              </ion-list>
            </div>
          </ion-list>
        </ion-card>

        <div
          v-if="
            this.tab === 'budget' &&
            Object.keys(this.$store.state.events.myEventOrders).length > 0
          "
        >
          <ion-card class="commandes">
            <ion-card-header>
              <ion-card-title color="primary">Commandes</ion-card-title>
            </ion-card-header>
            <ion-card
              v-for="plat in this.$store.state.events.myEventDetails.plats"
              :key="plat.id"
            >
              <div class="plats">
                <div class="img-container">
                  <img alt="plat-img" :src="plat.photo_url" />
                </div>
                <div class="info">
                  <p>{{ plat.libelle }}</p>
                </div>
                <div class="price">
                  <ion-badge>{{ plat.quantity }}</ion-badge>
                </div>
              </div>
            </ion-card>
          </ion-card>

          <ion-card class="budget">
            <ion-card-header>
              <ion-card-title color="primary">Budget</ion-card-title>
            </ion-card-header>
            <ion-card
              v-for="plat in this.$store.state.events.myEventDetails.plats"
              :key="plat.id"
            >
              <div class="plats">
                <div class="img-container">
                  <img alt="plat-img" :src="plat.photo_url" />
                </div>
                <div class="info">
                  <p>{{ plat.libelle }}</p>
                </div>
                <div class="price">
                  <ion-badge slot="end">{{ plat.total }} €</ion-badge>
                </div>
              </div>
            </ion-card>
            <ion-item-divider color="primary">
              <ion-label>
                Montant total:
                {{ this.$store.state.events.myEventDetails.totalBudget }} €
              </ion-label>
            </ion-item-divider>
          </ion-card>
        </div>
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
  IonCardHeader,
  IonCardTitle,
  IonBadge,
  IonItem,
  IonLabel,
  IonItemDivider,
  IonList,
  IonListHeader,
  IonSelect,
  IonSelectOption,
  IonSegment,
  IonSegmentButton,
} from "@ionic/vue";
import Sub from "../components/Sub.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import RefreshData from "../components/RefreshData.vue";

export default defineComponent({
  name: "MyEventDetails",
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonBadge,
    IonItem,
    IonLabel,
    IonItemDivider,
    IonList,
    IonListHeader,
    IonSelect,
    IonSelectOption,
    Sub,
    Header,
    Footer,
    RefreshData,
    IonSegment,
    IonSegmentButton,
  },
  data() {
    return {
      tab: "gestion",
      toggleStatusOrder: "pending",
      interval: null,
      nameEvent: "",
    };
  },
  computed: {
    isCreator() {
      let isCreator = null;
      this.$store.state.events.myEvents.forEach((event) => {
        if (event.id == this.$route.params.id) {
          if (event.user_id == this.$store.getters.getUserInformation.id) {
            isCreator = true;
          } else {
            isCreator = false;
          }
        }
      });
      return isCreator;
    },
  },
  async ionViewWillEnter() {
    await this.$store.dispatch("getMyEventDetails", this.$route.params.id);
    await this.$store.dispatch("getMyEventOrders");
    this.nameEvent = this.$store.state.events.myEventDetails.event.name;
  },
  ionViewDidEnter() {
    this.interval = setInterval(
      () => this.$store.dispatch("getMyEventOrders"),
      5000
    );
  },
  ionViewWillLeave() {
    clearInterval(this.interval);
  },
  methods: {
    selectedValue(ev, orderId) {
      const order = {
        id: orderId,
        status: ev.target.value,
      };
      this.$store.dispatch("putOrderStatus", order);
    },
  },
});
</script>

<style lang="scss" scoped>
#container {
  .commandes,
  .budget {
    .plats {
      display: flex;
      align-items: center;
      padding: 1em;

      .info {
        width: 70%;
        padding: 0 1em;
        color: #7e2727;
        font-weight: bold;
      }

      .img-container {
        height: 60px;
        min-width: 60px;
        width: 30%;
        img {
          height: 100%;
          width: 100%;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>