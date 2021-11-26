import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from '../../public/assets/icon/place_red_24dp.svg';
import { Geolocation } from '@capacitor/geolocation';
import store from "../store/store";
import popups from "../components/ToastController";
import router from "../router/index";

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
            console.log("load");
            spinner.style.display = "none";
        });

        this.mymap.on("unload", function () {
            console.log("unload");
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
        const getPosition = await printCurrentPosition();
        let longitude = getPosition.coords.longitude;
        let latitude = getPosition.coords.latitude;

        console.log("my position lon", longitude, "lat", latitude);
        this.mymap.setView([latitude, longitude], 8);
    }

    async openMap() {
        if (!this.mymap) {
            this.buildMap();
        }

        const getPosition = await printCurrentPosition();
        let longitude = getPosition.coords.longitude;
        let latitude = getPosition.coords.latitude;

        console.log("my position lon", longitude, "lat", latitude);
        this.mymap.setView([latitude, longitude], 8);

        await this.placeMarkers();
    }

    async placeMarkers() {
        try {
            let publicEvents = store.state.apiGouv.publicEvents;
            console.log("length publicEvents", store.state.apiGouv.publicEvents.length);

            console.log("publicEvents in mapEvents => ", publicEvents);

            let arrayMarkers = [];

            for (let index = 0; index < publicEvents.length; index++) {
                let marker = new L.marker([publicEvents[index].coords[1], publicEvents[index].coords[0]])
                    .bindPopup(`
                <ion-list class="popup">
                    <ion-list-header>${publicEvents[index].informations.name}</ion-list-header>
                    <p>
                        Date : ${publicEvents[index].informations.date}</br>
                        Lieu : ${publicEvents[index].informations.fullAddress}</br>
                        ${publicEvents[index].informations.id}
                    </p>
                    <ion-button @click='join()'>Go</ion-button>
                </ion-list>`)

                arrayMarkers.push(marker);
            }

            L.layerGroup(arrayMarkers).addTo(this.mymap);
        } catch (error) {
            console.error("une erreur => ", error);
        }
    }

    redirectToEvent(id) {
        console.log("id event redirect", id);
        let form = `<form method="get" onsubmit="${router.push({ name: "Categories", params: { id: id } })}">
        <button type="submit">Go</button>
     </form>`
        return form;

    }

}

export default new MapEvents;