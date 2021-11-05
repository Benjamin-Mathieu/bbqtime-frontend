<template>
  <ion-menu side="end" menu-id="shop" content-id="main">
    <ion-content class="shop">
      <div v-if="this.$store.state.shop.plats.length === 0" class="empty">
        <p>Votre panier est vide</p>
      </div>

      <div v-else>
        <!-- List of Plat in Shop -->
        <ion-list lines="none">
          <ion-item-sliding
            v-for="plat in this.$store.state.shop.plats"
            :key="plat.id"
          >
            <ion-item>
              <div class="plat">
                <img alt="plat-img" :src="plat.photo_url" />
                <p>{{ plat.libelle }}</p>
                <div class="info-plat">
                  <ion-icon name="close" @click="removePlat(plat)"></ion-icon>
                  <ion-item>
                    <ion-select
                      :id="plat.id"
                      ok-text="Valider"
                      cancel-text="Fermer"
                      :value="plat.qty"
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
                  <ion-item>{{ plat.price * plat.qty + "€" }} </ion-item>
                </div>
              </div>
            </ion-item>
            <ion-item-options>
              <ion-item-option @click="removePlat(plat)" color="primary">
                <ion-icon slot="end" name="close"></ion-icon>
                Supprimer
              </ion-item-option>
            </ion-item-options>
          </ion-item-sliding>
        </ion-list>
        <div class="total">
          <span></span>
          <p>Montant total: {{ this.$store.getters.getTotalShop + "€" }}</p>
        </div>
        <div class="order-button">
          <ion-button @click="goToShop()" size="medium">Commander</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-menu>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonMenu,
  IonContent,
  menuController,
  IonIcon,
  IonList,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonButton,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import AlertController from "../AlertController";

export default defineComponent({
  name: "ShopMenu",
  components: {
    IonMenu,
    IonContent,
    IonIcon,
    IonList,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonItem,
    IonButton,
    IonSelect,
    IonSelectOption,
  },

  data() {
    return {
      totalOrder: 0,
      qty: 1,
      selectedQty: 1,
    };
  },

  methods: {
    selectedValue(ev) {
      this.selectedQty = ev.target.value;
      const plat = { id: ev.target.id, qty: this.selectedQty };
      this.$store.commit("updateShop", plat);
    },

    openShop() {
      menuController.enable(true, "shop");
      menuController.open("shop");
    },

    goToShop() {
      menuController.close();
      this.$router.push({ name: "Shop" });
    },

    removePlat(plat) {
      AlertController.validDelete(
        plat,
        "Voulez-vous supprimez le plat de votre panier ?",
        "platInShop"
      );
    },
  },
});
</script>

<style lang="scss" scoped>
ion-list {
  padding-bottom: 0px;
  padding-top: 0px;

  ion-item {
    --background: #e5e5e5;
    --color: #7f2928;
  }
}

ion-select {
  /* Applies to the value and placeholder color */
  color: #7a1c1e;
  border: 2px solid #7a1c1e;
  border-radius: 4px;
  background-color: white;
  --padding-start: 10px;
}
/* Set the icon color and opacity */
ion-select::part(icon) {
  color: #7a1c1e;
  opacity: 1;
}

p {
  font-weight: 600;
}

.total {
  position: relative;
  text-align: right;
  margin: 0.7em auto;
  width: 80%;
  font-weight: bold;
  color: #7a1c1e;
  display: flex;
  flex-direction: column;
  span {
    position: absolute;
    right: 0;
    height: 5px;
    width: 30%;
    border-radius: 1em;
    background-color: #7a1c1e;
  }
}

.shop {
  .empty {
    text-align: center;
    color: #7f2928;
    position: relative;
    top: 30%;
  }

  .plat {
    width: 100%;
    color: #7f2928;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .info-plat {
      text-align: right;
    }

    p {
      padding-left: 0.7em;
    }

    img {
      height: 80px;
      width: 100%;
      max-width: 80px;
      border-radius: 5px;
    }
  }

  .order-button {
    text-align: center;
  }
}
</style>