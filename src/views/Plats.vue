<template>
  <ion-page>
    <Header></Header>
    <Sub
      :showShopButton="true"
      :title="this.$store.getters.getCurrentEvent.name + ' / ' + this.categorie"
    ></Sub>
    <ion-content>
      <div
        v-for="categorie in this.$store.state.events.eventDetails.categories"
        :key="categorie.id"
      >
        <ion-grid>
          <ion-row>
            <ion-col v-for="plat in categorie.plats" :key="plat.id" size="6">
              <ion-card
                v-if="plat.category_id == this.$route.params.idCategorie"
              >
                <ion-card-header>
                  <img
                    style="border-radius: 4px; height: 122px"
                    :src="plat.photo_url"
                    alt="img-plat"
                  />
                  <h3 style="color: red" v-if="plat.stock === 0">
                    Rupture de stock !
                  </h3>
                  <ion-card-subtitle>
                    {{ plat.libelle + plat.price + "€" }}
                  </ion-card-subtitle>
                </ion-card-header>

                <ion-card-content>
                  <p>{{ plat.description }}</p>
                  <div class="quantity" v-if="plat.stock > 0">
                    <ion-item lines="none">
                      <ion-select
                        :ref="'quantity' + plat.id"
                        ok-text="Valider"
                        cancel-text="Fermer"
                        :value="this.selectedQty"
                        @ionChange="selectedValue($event)"
                      >
                        <ion-select-option
                          v-for="(selectQty, index) in plat.stock"
                          :key="index"
                          :value="selectQty"
                          v-model="qty[index]"
                        >
                          {{ selectQty }}
                        </ion-select-option>
                      </ion-select>
                    </ion-item>
                    <ion-button
                      slot="icon-only"
                      @click="addToShop(plat)"
                      size="small"
                    >
                      <ion-icon :icon="addCircleOutline"></ion-icon>
                    </ion-button>
                  </div>
                  <div class="stock">
                    <ion-progress-bar
                      :value="1 - plat.qty / plat.stock"
                    ></ion-progress-bar>
                  </div>
                </ion-card-content>
              </ion-card>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
    <Footer :showDetails="true"></Footer>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonCardSubtitle,
  IonIcon,
  IonButton,
  IonProgressBar,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import { addCircleOutline } from "ionicons/icons";
import Sub from "../components/Sub.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import popup from "../components/ToastController";

export default defineComponent({
  name: "Categories",
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonCardSubtitle,
    IonIcon,
    IonButton,
    IonProgressBar,
    IonSelect,
    IonSelectOption,
    Sub,
    Header,
    Footer,
  },
  setup() {
    return {
      addCircleOutline,
    };
  },
  data() {
    return {
      qty: 1,
      selectedQty: 1,
    };
  },
  computed: {
    categorie() {
      let value = "";
      this.$store.getters.getCurrentEvent.categories.forEach((categorie) => {
        if (this.$route.params.idCategorie == categorie.id) {
          value = categorie.libelle;
        }
      });
      return value;
    },
  },
  methods: {
    selectedValue(ev) {
      this.selectedQty = ev.target.value;
    },
    addToShop(addedPlat) {
      // Check if plat is already in shop
      if (addedPlat.qty !== undefined) {
        if (addedPlat.qty >= addedPlat.stock) {
          return popup.error("Plus de stock !");
        } else {
          let totalQty = addedPlat.qty + this.selectedQty;

          if (totalQty > addedPlat.stock) {
            return popup.error(
              "La quantité ajoutée dépasse le stock disponible !"
            );
          } else {
            popup.success(
              this.selectedQty + " quantité, ajouté à " + addedPlat.libelle
            );
            addedPlat.qty = totalQty;
            this.$store.commit("setShop", addedPlat);
          }
        }
      } else {
        addedPlat.qty = this.selectedQty;
        this.$store.commit("setShop", addedPlat);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
ion-card {
  width: 90%;
}
ion-select {
  color: #7a1c1e;
  border: 2px solid #7a1c1e;
  border-radius: 4px;
  background-color: white;
  width: 2000px;
}
ion-select::part(icon) {
  color: #7a1c1e;
  opacity: 1;
}

ion-item {
  --padding-start: 0px;
}

ion-card-content {
  p {
    margin-bottom: 1em;
  }
  .quantity {
    display: flex;
    align-items: center;
    margin-bottom: 1em;
  }
}
</style>