import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from '../../public/assets/icon/place_red_24dp.svg';
import { Geolocation } from '@capacitor/geolocation';
import store from "../store/store";
import popups from "../components/ToastController";
import router from "../router/index";
import { modalController } from "@ionic/vue";
import { Diagnostic } from "@ionic-native/diagnostic";

const printCurrentPosition = async () => {
    const status = await Geolocation.checkPermissions();
    if (status.location === "granted") {
        const coordinates = await Geolocation.getCurrentPosition();
        return coordinates;
    } else {
        requestPermissions();
    }
};

const requestPermissions = async () => {
    const permissions = await Geolocation.requestPermissions({ permissions: 'coarseLocation' });

    if (permissions.location == "denied" || permissions.location == "prompt-with-rationale") {
        popups.warning("Vous devez autorisé la géolocalisation dans les paramètres de l'application !");
    }
}

const convertDate = async (dateToConvert) => {
    const date = new Date(dateToConvert);
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();
    const h = date.getUTCHours();
    let min = date.getMinutes();
    if (min < 10) min = "0" + min;

    const converted_date = `${d}/${m}/${y} à ${h}:${min}`
    return converted_date;
}

const onJoinClick = async (id) => {
    await router.push({ name: "Categories", params: { id: id } });
    modalController.dismiss();
}

class MapEvents {

    constructor(mymap) {
        this.mymap = mymap;
    }

    buildMap() {
        let spinner = document.querySelector(".spinner");
        spinner.style.display = "block"; // Show spinner 

        this.mymap = L.map("events-map");

        let openStreetMapLayer = L.tileLayer(
            `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.VUE_APP_TOKEN_LEAFLET}`,
            {
                attribution:
                    '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 100,
                id: "mapbox/streets-v11",
                tileSize: 512,
                zoomOffset: -1,
            }
        ).addTo(this.mymap);

        this.mymap.addLayer(openStreetMapLayer);

        // Show spinner until map load
        this.mymap.on("load", function () {
            console.log("mymap.on load");
            spinner.style.display = "none";
        });

        this.mymap.on("unload", function () {
            console.log("mymap.on unload");
            store.commit("setCoordinatesPublicEvents", []); // init array of coordinates
        })

        setTimeout(() => {
            this.mymap.invalidateSize(); // fix size
        }, 100)

        // Custom marker
        let DefaultIcon = L.icon({
            iconUrl: icon,
            iconSize: [50, 95], // size of the icon
        });
        L.Marker.prototype.options.icon = DefaultIcon;
    }

    initMap() {
        this.mymap = null;
    }

    async centerMapOnUserPosition() {
        const isGpsEnabled = await Diagnostic.isLocationEnabled();
        console.log("diag", isGpsEnabled);
        if (!isGpsEnabled) {
            popups.warning("Votre GPS est désactivé sur votre appareil");
            this.mymap.setView([46.227638, 2.213749], 5);
        } else {
            const getPosition = await printCurrentPosition();
            let longitude = getPosition.coords.longitude;
            let latitude = getPosition.coords.latitude;

            console.log("my position lon", longitude, "lat", latitude);
            this.mymap.setView([latitude, longitude], 12);
        }
    }

    async openMap() {
        if (!this.mymap) {
            this.buildMap();
        }

        await this.centerMapOnUserPosition();
        await this.placeMarkers();
    }

    async placeMarkers() {
        let publicEvents = store.state.apiGouv.publicEvents;
        console.log("publicEvents in mapEvents => ", publicEvents);

        for (let index = 0; index < publicEvents.length; index++) {
            const date = await convertDate(publicEvents[index].informations.date);

            let marker = new L.marker([publicEvents[index].coords[1], publicEvents[index].coords[0]])
                .addTo(this.mymap)
                .bindPopup(`
                <div class="popup">
                    <h5 text-align="center">${publicEvents[index].informations.name}</h5>
                    <p>
                        <b>Date :</b> ${date}</br></br>
                        <b>Lieu :</b> ${publicEvents[index].informations.fullAddress}</br></br>
                        <b>Description :</b>  ${publicEvents[index].informations.description}
                    </p>
                    <ion-button size="small" fill="outline" id="join">Rejoindre</ion-button>
                </div>`)

            marker.addEventListener("popupopen", () => {
                document.getElementById("join").addEventListener("click", () => onJoinClick(publicEvents[index].informations.id));
            });

            marker.addEventListener("click", () => {
                const marker_pos = marker.getLatLng();
                this.mymap.flyTo([marker_pos.lat, marker_pos.lng], 16);
            });
        }
    }
}

export default new MapEvents;