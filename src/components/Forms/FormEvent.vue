<template>
  <form @submit.prevent="addInfoEvent()" method="post">
    <ion-card>
      <ion-item>
        <ion-label position="floating">Nom</ion-label>
        <ion-input type="text" v-model="name" required></ion-input>
      </ion-item>
      <ion-item
        :class="{ 'no-address-selected': noAddressSelected }"
        lines="none"
      >
        <ion-label>Choisir le lieu</ion-label>
        <ion-button @click="openMapModal()">Ouvrir carte</ion-button>
      </ion-item>
      <ion-item
        v-if="
          Object.keys(this.$store.state.events.eventTmp).length > 0 &&
          Object.keys(this.$store.getters.getAddress).length === 0
        "
      >
        {{
          this.$store.state.events.eventTmp.address +
          ", " +
          this.$store.state.events.eventTmp.zipcode +
          " " +
          this.$store.state.events.eventTmp.city
        }}
      </ion-item>
      <ion-item v-else>
        Adresse: {{ this.$store.state.apiGouv.address }}
      </ion-item>
      <ion-item :class="{ 'no-date-selected': noDateSelected }">
        <ion-label>Date</ion-label>
        <ion-datetime
          v-model="date"
          day-short-names="customDayShortNames"
          display-format="DD MMM"
          month-short-names="janvier, février, mars, avril, mai, juin, juillet, août, septembre, octobre, novembre, décembre"
          done-text="Valider"
          cancel-text="Fermer"
          :min="actualDate"
        ></ion-datetime>
      </ion-item>
      <ion-item :class="{ 'no-hours-selected': noHoursSelected }">
        <ion-label>Heure</ion-label>
        <ion-datetime
          v-model="hours"
          display-format="HH:mm"
          display-timezone="utc"
          done-text="Valider"
          cancel-text="Fermer"
          minuteValues="0,15,30,45"
        ></ion-datetime>
      </ion-item>

      <ion-item>
        <ion-label position="floating">Description (optionnel)</ion-label>
        <ion-textarea type="text" v-model="description"></ion-textarea>
      </ion-item>

      <ion-item :class="{ 'no-file-selected': noFileSelected }">
        <ion-thumbnail v-if="this.img !== null" slot="end">
          <ion-img :src="this.img" alt="img"></ion-img>
        </ion-thumbnail>
        <input
          style="display: none"
          type="file"
          name="image"
          @change="pickImage"
          ref="fileInput"
          accept=".jpeg, jpg, .png"
        />
        <ion-button size="small" fill="clear" @click="$refs.fileInput.click()">
          Ajouter une image
        </ion-button>
      </ion-item>

      <ion-item>
        <ion-label>Evènement privé:</ion-label>
        <ion-checkbox
          color="primary"
          v-model="isPrivate"
          slot="end"
        ></ion-checkbox>
      </ion-item>

      <ion-item>
        <ion-input
          :type="typeInputPassword"
          placeholder="Saisir mot de passe"
          v-model="password"
          required
        ></ion-input>
        <ion-button
          :disabled="disabledButton"
          @click="show()"
          fill="clear"
          slot="end"
        >
          <ion-icon :icon="icon"></ion-icon>
        </ion-button>
      </ion-item>

      <ion-item>
        <ion-button
          v-if="Object.keys(this.$store.state.events.eventTmp).length === 0"
          :disabled="disabledButton"
          type="submit"
          size="small"
          slot="end"
        >
          Valider
          <ion-spinner
            v-if="showSpinner === true"
            name="crescent"
          ></ion-spinner>
        </ion-button>

        <ion-button :disabled="disabledButton" v-else @click="updateEvent()">
          Modifier
          <ion-spinner
            v-if="showSpinner === true"
            name="crescent"
          ></ion-spinner>
        </ion-button>
      </ion-item>
    </ion-card>
  </form>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonLabel,
  IonItem,
  IonButton,
  IonCheckbox,
  IonInput,
  IonDatetime,
  IonTextarea,
  IonThumbnail,
  IonImg,
  IonCard,
  IonSpinner,
  IonIcon,
  modalController,
} from "@ionic/vue";
import { eyeOutline, eyeOffOutline } from "ionicons/icons";
import showModal from "../Modals/ModalController";

export default defineComponent({
  name: "FormEvent",
  components: {
    IonLabel,
    IonItem,
    IonButton,
    IonCheckbox,
    IonInput,
    IonDatetime,
    IonThumbnail,
    IonImg,
    IonTextarea,
    IonCard,
    IonSpinner,
    IonIcon,
  },
  data() {
    return {
      name: this.$store.state.events.eventTmp.name
        ? this.$store.state.events.eventTmp.name
        : "",
      date: this.$store.state.events.eventTmp.date
        ? this.$store.state.events.eventTmp.date
        : "",
      hours: this.$store.state.events.eventTmp.date
        ? this.$store.state.events.eventTmp.date
        : "",
      description: this.$store.state.events.eventTmp.description
        ? this.$store.state.events.eventTmp.description
        : "",
      img: this.$store.state.events.eventTmp.photo_url
        ? this.$store.state.events.eventTmp.photo_url
        : null,
      file: null,
      isPrivate: this.$store.state.events.eventTmp.private
        ? this.$store.state.events.eventTmp.private
        : false,
      password: this.$store.state.events.eventTmp.password
        ? this.$store.state.events.eventTmp.password
        : "",
      showPassword: false,
      typeInputPassword: "password",
      icon: eyeOutline,
      noFileSelected: false,
      noAddressSelected: false,
      noDateSelected: false,
      noHoursSelected: false,
      disabledButton: false,
      showSpinner: false,
    };
  },

  computed: {
    actualDate() {
      return new Date().toISOString();
    },
  },

  methods: {
    show() {
      this.showPassword = !this.showPassword;
      this.showPassword
        ? ((this.typeInputPassword = "password"), (this.icon = eyeOutline))
        : ((this.typeInputPassword = "text"), (this.icon = eyeOffOutline));
    },

    pickImage(selected) {
      this.file = selected.target.files[0];
      this.img = URL.createObjectURL(this.file);
    },

    async checkIfUserSelectFile() {
      try {
        if (this.file === null) {
          this.noFileSelected = true;
          return false;
        } else {
          this.noFileSelected = false;
          return true;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async checkIfUserSelectAddress() {
      try {
        if (Object.keys(this.$store.getters.getAddress).length === 0) {
          this.noAddressSelected = true;
          return false;
        } else {
          this.noAddressSelected = false;
          return true;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async checkIfUserSelectDate() {
      try {
        if (this.date === "" && this.hours === "") {
          this.noDateSelected = true;
          this.noHoursSelected = true;
          return false;
        }

        if (this.date === "") {
          this.noDateSelected = true;
          return false;
        }

        if (this.hours === "") {
          this.noHoursSelected = true;
          return false;
        }

        if (this.hours !== "" && this.date !== "") {
          return true;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async addInfoEvent() {
      this.disabledButton = true;
      this.showSpinner = true;

      const check1 = await this.checkIfUserSelectFile();
      const check2 = await this.checkIfUserSelectAddress();
      const check3 = await this.checkIfUserSelectDate();

      if (check1 && check2 && check3) {
        const date = this.convertDate(this.date, this.hours);

        const event = {
          name: this.name,
          address: this.$store.getters.getAddress.name,
          city: this.$store.getters.getAddress.city,
          zipcode: this.$store.getters.getAddress.postcode,
          date: date,
          description: this.description,
          private: this.isPrivate,
          file: this.file,
          password: this.password,
        };

        await this.$store.dispatch("postEvent", event);
        this.disabledButton = false;
        this.showSpinner = false;
      } else {
        this.disabledButton = false;
        this.showSpinner = false;
      }
    },

    convertDate(date, hours) {
      const d = new Date(date);
      const h = new Date(hours);
      return new Date(
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        h.getHours(),
        h.getMinutes()
      ).toISOString();
    },

    async updateEvent() {
      this.disabledButton = true;
      this.showSpinner = true;
      const date = this.convertDate(this.date, this.hours);

      const event = {
        id: this.$store.state.events.eventTmp.id,
        name: this.name,
        address: this.$store.getters.getAddress.name
          ? this.$store.getters.getAddress.name
          : this.$store.state.events.eventTmp.address,
        city: this.$store.getters.getAddress.city
          ? this.$store.getters.getAddress.city
          : this.$store.state.events.eventTmp.city,
        zipcode: this.$store.getters.getAddress.postcode
          ? this.$store.getters.getAddress.postcode
          : this.$store.state.events.eventTmp.zipcode,
        date: date,
        description: this.description,
        private: this.isPrivate,
        file: this.file
          ? this.file
          : this.$store.state.events.eventTmp.fileFromServer,
        password: this.password,
      };

      await this.$store.dispatch("putEvent", event);
      this.disabledButton = false;
      this.showSpinner = false;
      modalController.dismiss();
    },

    openMapModal() {
      showModal.map();
    },
  },
});
</script>

<style lang="scss" scoped>
.no-file-selected,
.no-address-selected,
.no-date-selected,
.no-hours-selected {
  --background: red;
}
</style>