<template>
  <ion-menu side="end" menu-id="shop" content-id="main">
    <ion-content class="shop">
      <p v-if="this.$store.state.shop.length === 0">Votre panier est vide</p>

      <!-- List of Plat in Shop -->
      <ion-list lines="none" v-else>
        <ion-item v-for="plat in this.$store.state.shop" :key="plat.id">
          <div class="plat">
            <img alt="plat-img" :src="plat.photo_url" />
            <p>{{ plat.libelle }}</p>
            <div>
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
              <ion-label>{{ plat.price + "€" }} </ion-label>
            </div>
          </div>
        </ion-item>
        <ion-item-divider color="primary"></ion-item-divider>
        <ion-item>
          <b>Montant total: {{ this.$store.getters.getTotalShop }}</b>
        </ion-item>
        <ion-item>
          <router-link :to="{ name: 'Shop' }">
            <ion-button size="medium">Commander</ion-button>
          </router-link>
        </ion-item>
      </ion-list>
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
  IonLabel,
  IonButton,
  IonItemDivider,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
export default defineComponent({
  name: "ShopMenu",
  components: {
    IonMenu,
    IonContent,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonItemDivider,
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
    removePlat(plat) {
      this.$store.commit("removePlatInShop", plat);
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
  }
}

.plat {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  div {
    text-align: right;
  }
}
</style>