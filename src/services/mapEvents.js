import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from '../../public/assets/icon/place_red_24dp.svg';
import store from "../store/store";
import router from "../router/index";
import { modalController } from "@ionic/vue";
import { Diagnostic } from "@ionic-native/diagnostic";
import { printCurrentPosition, convertDate } from "../utils/utils";
import popups from "../components/ToastController";

const onJoinClick = async (id) => {
    await router.push({ name: "Categories", params: { id: id } });
    modalController.dismiss();
}

class MapEvents {

    constructor(mymap) {
        this.mymap = mymap;
    }

    async buildMap() {
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
            spinner.style.display = "none";
        });

        this.mymap.on("unload", function () {
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
        if (!isGpsEnabled) {
            popups.warning("Votre GPS est désactivé sur votre appareil");
            this.mymap.setView([46.227638, 2.213749], 5);
        } else {
            const getPosition = await printCurrentPosition();
            let longitude = getPosition.coords.longitude;
            let latitude = getPosition.coords.latitude;

            this.mymap.setView([latitude, longitude], 12);
        }
    }

    async loadMap() {
        try {
            await store.dispatch("getAllPublicEvents");
            await this.buildMap();
            await this.centerMapOnUserPosition();
            await this.placeMarkers();
        } catch (error) {
            console.error("error", error);
        }

    }

    async placeMarkers() {
        let publicEvents = store.state.events.allPublicEvents;
        let markers = [];

        for (let index = 0; index < publicEvents.length; index++) {
            const date = await convertDate(publicEvents[index].date);

            let marker = new L.marker([publicEvents[index].latitude, publicEvents[index].longitude])
                .bindPopup(`
                <div class="popup">
                    <h5 text-align="center">${publicEvents[index].name}</h5>
                    <p>
                        <b>Date :</b> ${date}</br></br>
                        <b>Lieu :</b> ${publicEvents[index].address}, ${publicEvents[index].city} ${publicEvents[index].zipcode}</br></br>
                        <b>Description :</b>  ${publicEvents[index].description}
                    </p>
                    <ion-button size="small" fill="outline" id="join">Rejoindre</ion-button>
                </div>`);

            marker.on("popupopen", () => {
                document.getElementById("join").addEventListener("click", () => onJoinClick(publicEvents[index].id));
            });

            marker.addEventListener("click", () => {
                const marker_pos = marker.getLatLng();
                this.mymap.flyTo([marker_pos.lat, marker_pos.lng], 16);
            });

            markers.push(marker);
        }
        L.layerGroup(markers).addTo(this.mymap);

    }
}

export default new MapEvents;