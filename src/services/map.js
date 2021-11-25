import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from '../../public/assets/icon/place_red_24dp.svg';
import { Geolocation } from '@capacitor/geolocation';
import store from "../store/store";
import popups from "../components/ToastController";

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

class Map {

    constructor(mymap, marker) {
        this.mymap = mymap;
        this.marker = marker;
    }

    buildMap() {

        let spinner = document.querySelector(".spinner");
        spinner.style.display = "block"; // Show spinner 

        this.mymap = L.map("mapid");

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

        setTimeout(() => {
            this.mymap.invalidateSize(); // fix size
        }, 100)

        // Custom marker
        let DefaultIcon = L.icon({
            iconUrl: icon,
            iconSize: [50, 95], // size of the icon
        });
        L.Marker.prototype.options.icon = DefaultIcon;

        // Moove marker
        this.mymap.on("click", (e) => {
            console.log("in click event", e);
            const coords = {
                lat: e.latlng.lat,
                lon: e.latlng.lng
            }
            this.mymap.removeLayer(this.marker);
            this.marker = new L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.mymap);
            store.dispatch("reverseAddress", coords);
        });
    }

    initMap() {
        this.mymap = null;
    }

    async openMap() {

        let lat;
        let lon;

        if (store.state.apiGouv.address !== "" && Object.keys(store.state.events.eventTmp).length === 0) {
            console.log("openMap : in if");
            lat = store.state.apiGouv.respApiAddress[0].geometry.coordinates[1];
            lon = store.state.apiGouv.respApiAddress[0].geometry.coordinates[0];

            this.getMap(lat, lon);
        } else if (Object.keys(store.state.events.eventTmp).length > 0) {
            console.log("openMap : in else if");

            let address = (store.state.events.eventTmp.address + " " + store.state.events.eventTmp.zipcode + " " + store.state.events.eventTmp.city);

            store.commit("setAddress", address);
            await store.dispatch("getAddress");

            lat = store.state.apiGouv.respApiAddress[0].geometry.coordinates[1];
            lon = store.state.apiGouv.respApiAddress[0].geometry.coordinates[0];

            this.getMap(lat, lon);
        }
        else {
            console.log("openMap : in else");

            this.getMapOnUserPosition();
        }
    }

    async getMapOnUserPosition() {
        const getPosition = await printCurrentPosition();
        let longitude = getPosition.coords.longitude;
        let latitude = getPosition.coords.latitude;

        if (!this.mymap) {
            this.buildMap();
            this.mymap.setView([latitude, longitude], 18);
        } else {
            this.mymap.removeLayer(this.marker);
            this.mymap.flyTo([latitude, longitude], 18);
        }

        console.log("size", this.mymap.getSize());
        // Add marker
        this.marker = new L.Marker([latitude, longitude]);
        this.mymap.addLayer(this.marker);
    }

    async getMap(latitude, longitude) {
        console.log("in getMap(): lat", latitude, "lon ", longitude);

        if (!this.mymap) {
            this.buildMap();
            this.mymap.setView([latitude, longitude], 18);
        } else {
            console.log("in getMap() else");

            this.mymap.removeLayer(this.marker);
            this.mymap.setView([latitude, longitude], 18);
        }

        console.log("center => ", this.mymap.getCenter());
        console.log("map size", this.mymap.getSize());


        // Place marker
        this.marker = new L.Marker([latitude, longitude]);
        this.mymap.addLayer(this.marker);
    }
}

export default new Map;