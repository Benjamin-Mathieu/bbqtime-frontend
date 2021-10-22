<template>
  <ion-page>
    <Header></Header>
    <Sub :title="'Détails / ' + nameEvent"></Sub>
    <ion-content>
      <RefreshData callApi="getMyEventOrders"></RefreshData>
      <ion-segment :value="tab">
        <ion-segment-button @click="this.tab = 'gestion'" value="gestion">
          <ion-label>Gestion</ion-label>
        </ion-segment-button>
        <ion-segment-button @click="this.tab = 'budget'" value="budget">
          <ion-label>Budget</ion-label>
        </ion-segment-button>
      </ion-segment>

      <ion-fab vertical="bottom" horizontal="start" slot="fixed">
        <ion-fab-button>
          <ion-icon :icon="settings"></ion-icon>
        </ion-fab-button>
        <ion-fab-list side="end">
          <ion-fab-button @click="openModalQrcode()" color="primary">
            <ion-icon :icon="qrCode"></ion-icon>
          </ion-fab-button>
          <ion-fab-button @click="addAdmin()" color="primary">
            <ion-icon :icon="personAddOutline"></ion-icon>
          </ion-fab-button>
          <ion-fab-button @click="duplicateEvent()" color="primary">
            <ion-icon :icon="duplicate"></ion-icon>
          </ion-fab-button>
          <ion-fab-button @click="modifyEvent()" color="primary">
            <ion-icon :icon="pencil"></ion-icon>
          </ion-fab-button>
          <ion-fab-button @click="shareEvent()" color="primary">
            <ion-icon :icon="shareSocial"></ion-icon>
          </ion-fab-button>
          <ion-fab-button @click="deleteEvent()" color="primary">
            <ion-icon :icon="trash"></ion-icon>
          </ion-fab-button>
        </ion-fab-list>
      </ion-fab>

      <ion-card v-if="this.tab === 'gestion'" class="details">
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

        <ion-card
          v-for="order in this.$store.state.events.myEventOrders.orders"
          :key="order.id"
          class="orders"
        >
          <div
            class="pending-orders"
            v-if="order.status === 0 && this.toggleStatusOrder === 'pending'"
          >
            <ion-card-header>
              Commande de {{ order.user.firstname }} {{ order.user.name }}
            </ion-card-header>
            <ion-card-content>
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
            </ion-card-content>
          </div>

          <div
            class="prepared-orders"
            v-if="order.status === 1 && this.toggleStatusOrder === 'prepared'"
          >
            <ion-card-header>
              Commande de {{ order.user.firstname }} {{ order.user.name }}
            </ion-card-header>
            <ion-card-content>
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
            </ion-card-content>
          </div>

          <div
            class="delivered-orders"
            v-if="order.status === 2 && this.toggleStatusOrder === 'delivered'"
          >
            <ion-card-header>
              Commande de {{ order.user.firstname }} {{ order.user.name }}
            </ion-card-header>
            <ion-card-content>
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
            </ion-card-content>
          </div>
        </ion-card>
      </ion-card>

      <div v-if="this.tab === 'budget'">
        <ion-card class="commandes">
          <ion-card-header>
            <ion-card-title>Commandes</ion-card-title>
          </ion-card-header>
          <ion-card
            v-for="plat in this.$store.state.events.myEventDetails.plats"
            :key="plat.id"
          >
            <ion-grid>
              <ion-row>
                <ion-col size="2">
                  <ion-img alt="plat-img" :src="plat.public_img"></ion-img>
                </ion-col>
                <ion-col size="10">
                  <ion-item lines="none">
                    <ion-label>{{ plat.libelle }}</ion-label>
                    <ion-badge slot="end">{{ plat.quantity }}</ion-badge>
                  </ion-item>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-card>
        </ion-card>

        <ion-card class="budget">
          <ion-card-header>
            <ion-card-title>Budget</ion-card-title>
          </ion-card-header>
          <ion-card
            v-for="plat in this.$store.state.events.myEventDetails.plats"
            :key="plat.id"
          >
            <ion-grid>
              <ion-row>
                <ion-col size="2">
                  <ion-img alt="plat-img" :src="plat.public_img"></ion-img>
                </ion-col>
                <ion-col size="10">
                  <ion-item>
                    <ion-label>{{ plat.libelle }}</ion-label>
                    <ion-item slot="end">{{ plat.total }} €</ion-item>
                  </ion-item>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-card>
          <ion-item-divider color="primary">
            <ion-label>
              Montant total:
              {{ this.$store.state.events.myEventDetails.totalBudget }} €
            </ion-label>
          </ion-item-divider>
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
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonBadge,
  IonIcon,
  IonImg,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonLabel,
  IonItemDivider,
  IonList,
  IonSelect,
  IonSelectOption,
  IonSegment,
  IonSegmentButton,
  IonFab,
  IonFabList,
  IonFabButton,
} from "@ionic/vue";
import Sub from "../components/Sub.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import {
  download,
  personAddOutline,
  settings,
  qrCode,
  shareSocial,
  duplicate,
  pencil,
  trash,
} from "ionicons/icons";
import RefreshData from "../components/RefreshData.vue";
import ShowModal from "../components/Modals/ModalController";
import { Share } from "@capacitor/share";
import AlertController from "../components/AlertController";

export default defineComponent({
  name: "MyEventDetails",
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonBadge,
    IonIcon,
    IonImg,
    IonItem,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    IonItemDivider,
    IonList,
    IonSelect,
    IonSelectOption,
    Sub,
    Header,
    Footer,
    RefreshData,
    IonSegment,
    IonSegmentButton,
    IonFab,
    IonFabList,
    IonFabButton,
  },
  setup() {
    return {
      download,
      personAddOutline,
      settings,
      qrCode,
      shareSocial,
      duplicate,
      pencil,
      trash,
    };
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
    this.$store.dispatch("getMyEventOrders");
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
    addAdmin() {
      ShowModal.addAssociate();
    },

    deleteEvent() {
      AlertController.validDelete(
        this.$store.state.events.myEventDetails.event.id,
        "Confirmez-vous la suppression ?",
        "event"
      );
    },

    async duplicateEvent() {
      await this.$store.dispatch(
        "duplicateEvent",
        this.$store.state.events.myEventDetails.event.id
      );
      this.$router.push({ name: "AddEvent" });
    },

    async modifyEvent() {
      await this.$store.dispatch(
        "modifyEvent",
        this.$store.state.events.myEventDetails.event.id
      );
      this.$router.push({ name: "AddEvent" });
    },

    openModalQrcode() {
      ShowModal.qrCode();
    },

    selectedValue(ev, orderId) {
      const order = {
        id: orderId,
        status: ev.target.value,
      };
      this.$store.dispatch("putOrderStatus", order);
    },

    async shareEvent() {
      const event = this.$store.state.events.myEventDetails.event;
      await Share.share({
        title: "Invitation à un évènement",
        text: `Je t'invite à rejoindre mon évènement sur l'application BBQ Time via le mot de passe: ${event.password}`,
        dialogTitle: "Partagez votre évènement",
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1em;
}

.commandes,
.budget {
  width: 80%;
  margin: auto;
}

.budget {
  margin-top: 1em;
}
</style>