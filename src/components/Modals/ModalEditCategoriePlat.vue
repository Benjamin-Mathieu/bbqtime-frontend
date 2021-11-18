<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Éditer catégorie/plat</ion-title>
      <ion-button fill="clear" slot="end" @click="closeModal()">
        <ion-icon name="close"></ion-icon>
      </ion-button>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-segment :value="toggleForm" @ionChange="selectedValue($event)">
      <ion-segment-button value="categorie">
        <ion-label>Catégories</ion-label>
      </ion-segment-button>
      <ion-segment-button :disabled="noCategory" value="plats">
        <ion-label>Plats</ion-label>
      </ion-segment-button>
    </ion-segment>

    <div v-if="toggleForm === 'categorie'">
      <ion-button size="small" @click="openModalCategorie()">
        Ajouter catégorie
      </ion-button>
      <ion-grid>
        <ion-row>
          <ion-col
            v-for="categorie in this.$store.state.categories"
            :key="categorie.id"
            size="6"
          >
            <ion-card class="categorie">
              <div class="img-container">
                <img
                  v-if="categorie.plats.length > 0"
                  :src="categorie.plats[0].photo_url"
                  alt="img-categorie"
                />
                <p v-else></p>
              </div>
              <div class="info">
                <ion-card-title>{{ categorie.libelle }}</ion-card-title>
                <ion-card-subtitle>{{
                  "( " + categorie.plats.length + " plats )"
                }}</ion-card-subtitle>
                <div class="categorie-buttons">
                  <ion-button
                    slot="end"
                    size="small"
                    @click.stop="
                      openModalUpdateCategorie(categorie.id, categorie.libelle)
                    "
                  >
                    <ion-label>Éditer</ion-label>
                    <ion-icon slot="end" :icon="pencilOutline"></ion-icon>
                  </ion-button>
                  <ion-button
                    slot="end"
                    size="small"
                    @click.stop="deleteCategorie(categorie.id)"
                  >
                    <ion-label>Supprimer</ion-label>
                    <ion-icon slot="end" :icon="trashBinOutline"></ion-icon>
                  </ion-button>
                </div>
              </div>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </div>

    <div v-if="toggleForm === 'plats'">
      <ion-button size="small" @click="openModalPlat()">
        Ajouter plat
      </ion-button>
      <div v-for="plat in plats" :key="plat.id">
        <ion-card class="plat">
          <div class="img-container">
            <img :src="plat.photo_url" alt="img-plat" />
          </div>
          <div class="info">
            <h6>{{ plat.libelle }}</h6>
            <p>Prix : {{ plat.price + "€" }}</p>
            <p>Stock : {{ plat.stock }}</p>
            <div class="plat-buttons">
              <ion-button
                slot="end"
                size="small"
                @click.stop="openModalUpdatePlat(plat)"
              >
                <ion-label>Éditer</ion-label>
                <ion-icon slot="end" :icon="pencilOutline"></ion-icon>
              </ion-button>
              <ion-button
                slot="end"
                size="small"
                @click.stop="deletePlat(plat.id)"
              >
                <ion-label>Supprimer</ion-label>
                <ion-icon slot="end" :icon="trashBinOutline"></ion-icon>
              </ion-button>
            </div>
          </div>
        </ion-card>
      </div>
    </div>
  </ion-content>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonGrid,
  IonRow,
  IonCol,
  modalController,
} from "@ionic/vue";
import { pencilOutline, trashBinOutline } from "ionicons/icons";
import ShowAlert from "../AlertController";
import ShowModal from "../Modals/ModalController";

export default defineComponent({
  name: "ModalEditCategoriePlat",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonCard,
    IonCardTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonCardSubtitle,
  },
  
  setup() {
    return {
      pencilOutline,
      trashBinOutline,
    };
  },
  
  data() {
    return {
      toggleForm: "categorie"
    };
  },
  
  watch: {
    async toggleForm() {
      await this.$store.dispatch(
        "getCategories",
        this.$store.state.events.eventTmp.id
      );
    },
  },
  
  computed: {
    noCategory() {
      return this.$store.state.categories.length > 0 ? false : true;
    },

    plats() {
      let plats = [];
      this.$store.state.categories.forEach((categorie) => {
        categorie.plats.forEach((plat) => {
          plats.push(plat);
        });
      });
      return plats;
    },
  },

  methods: {
    closeModal() {
      modalController.dismiss();
    },
    
    selectedValue(e) {
      this.toggleForm = e.target.value;
    },

    deleteCategorie(id) {
      ShowAlert.validDelete(
        id,
        "Voulez-vous supprimez cette catégorie ?",
        "categorie"
      );
    },

    openModalCategorie() {
      ShowModal.addCategorie();
    },

    openModalUpdateCategorie(id, libelle) {
      ShowModal.updateCategorie(id, libelle);
    },

    openModalPlat() {
      ShowModal.addPlat();
    },

    openModalUpdatePlat(plat) {
      ShowModal.updatePlat(plat);
    },

    deletePlat(id) {
      ShowAlert.validDelete(id, "Voulez-vous supprimez ce plat ?", "plat");
    },
  },
});
</script>

<style lang="scss" scoped>
.plat {
  display: flex;
  padding: 0.5em;
  width: 100%;

  .img-container {
    width: 40%;
    img {
      border-radius: 5px;
      height: 144px;
      width: 100%;
      object-fit: fill;
    }
  }

  .info {
    padding-left: 0.5em;

    .plat-buttons {
      display: flex;
    }
  }
}

.categorie {
  text-align: center;
  img {
    height: 120px;
    width: 100%;
    border-radius: 5px;
    object-fit: fill;
  }

  .categorie-buttons {
    margin-top: 0.5em;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>