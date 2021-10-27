<template>
  <ion-page>
    <Header></Header>
    <Sub
      :showShopButton="true"
      :title="
        this.$store.getters.getCurrentEvent.name + ' / ' + libelleCategorie
      "
    ></Sub>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col v-for="plat in plats" :key="plat.id" size="6">
            <ion-card>
              <ion-card-header>
                <img
                  :src="plat.photo_url"
                  alt="img-plat"
                  style="
                    border-radius: 4px;
                    width: 100%;
                    height: 124px;
                    object-fit: fill;
                  "
                />
              </ion-card-header>

              <ion-card-content>
                <h3 style="color: red" v-if="plat.stock === 0">
                  Rupture de stock !
                </h3>
                <ion-card-subtitle color="primary">
                  {{ plat.libelle }}<br />
                  {{ plat.price + "€" }}
                </ion-card-subtitle>
                <p>{{ plat.description }}</p>
                <div class="quantity" v-if="plat.stock > 0">
                  <ion-item lines="none">
                    <ion-select
                      :ref="'quantity' + plat.id"
                      ok-text="Valider"
                      cancel-text="Fermer"
                      :value="1"
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
                    fill="outline"
                    @click="addToShop(plat)"
                    size="small"
                  >
                    <ion-icon :icon="add"></ion-icon>
                  </ion-button>
                </div>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
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
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import { add } from "ionicons/icons";
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
    IonSelect,
    IonSelectOption,
    Sub,
    Header,
    Footer,
  },
  setup() {
    return {
      add,
    };
  },
  data() {
    return {
      qty: 1,
      selectedQty: 1,
    };
  },
  computed: {
    libelleCategorie() {
      let libelle = "";
      this.$store.getters.getCurrentEvent.categories.forEach((categorie) => {
        if (this.$route.params.idCategorie == categorie.id) {
          libelle = categorie.libelle;
        }
      });
      return libelle;
    },

    plats() {
      let plats = [];
      this.$store.state.events.eventDetails.categories.forEach((categorie) => {
        categorie.plats.forEach((plat) => {
          if (plat.category_id == this.$route.params.idCategorie) {
            plats.push(plat);
          }
        });
      });
      return plats;
    },
  },
  methods: {
    selectedValue(ev) {
      this.selectedQty = ev.target.value;
    },
    addToShop(addedPlat) {
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
    justify-content: space-between;
    margin-bottom: 1em;
  }
}
</style>