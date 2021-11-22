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
    const permissions = await Geolocation.requestPermissions({permissions: 'coarseLocation'});
    
    if (permissions.location == "denied" || permissions.location == "prompt-with-rationale") {
        popups.warning("Vous devez autorisé la géolocalisation dans les paramètres de l'application !");
    }
}

let mymap;
let marker;

class Map {

    async initMap() {
        if (mymap) await mymap.remove()
    }

    async openMap() {
        if (store.state.apiGouv.address !== "") {
            let address = store.state.apiGouv.address;

            store.commit("setAddress", address);
            store.dispatch("getAddress");
        } else if (Object.keys(store.state.events.eventTmp).length > 0) {
            let address = (store.state.events.eventTmp.address + " " + store.state.events.eventTmp.zipcode + " " + store.state.events.eventTmp.city);

            store.commit("setAddress", address);
            store.dispatch("getAddress");
        }
        else {
            this.getMapOnUserPosition();
        }
    }

    async getMapOnUserPosition() {
        await this.initMap();
        let longitude, latitude;

        const getPosition = await printCurrentPosition();
        longitude = getPosition.coords.longitude;
        latitude = getPosition.coords.latitude;

        mymap = L.map("mapid").setView([latitude, longitude], 18);

        let openStreetMapLayer = L.tileLayer(
            `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.VUE_APP_TOKEN_LEAFLET}`,
            {
                attribution:
                    '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 100,
                id: "mapbox/streets-v11",
                tileSize: 512,
                zoomOffset: -1,
                accessToken: process.env.VUE_APP_TOKEN_LEAFLET,
            }
        ).addTo(mymap);

        let DefaultIcon = L.icon({
            iconUrl: icon,
            iconSize: [50, 95], // size of the icon
        });
        L.Marker.prototype.options.icon = DefaultIcon;

        marker = new L.Marker([latitude, longitude]);

        mymap.addLayer(openStreetMapLayer);
        mymap.addLayer(marker);

        mymap.on("click", function (e) {
            const coords = {
                lat: e.latlng.lat,
                lon: e.latlng.lng
            }

            mymap.removeLayer(marker);
            marker = new L.marker([e.latlng.lat, e.latlng.lng]).addTo(mymap);
            store.dispatch("reverseAddress", coords);
        });
    }

    async getMap(latitude, longitude) {
        await this.initMap();

        mymap = L.map("mapid").setView([latitude, longitude], 18);

        let openStreetMapLayer = L.tileLayer(
            `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${process.env.VUE_APP_TOKEN_LEAFLET}`,
            {
                attribution:
                    '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 100,
                id: "mapbox/streets-v11",
                tileSize: 512,
                zoomOffset: -1,
                accessToken: process.env.VUE_APP_TOKEN_LEAFLET,
            }
        ).addTo(mymap);
        mymap.addLayer(openStreetMapLayer);

        let DefaultIcon = L.icon({
            iconUrl: icon,
            iconSize: [50, 95], // size of the icon
        });
        L.Marker.prototype.options.icon = DefaultIcon;

        marker = new L.Marker([latitude, longitude]);
        mymap.addLayer(marker);

        mymap.on("click", function (e) {
            const coords = {
                lat: e.latlng.lat,
                lon: e.latlng.lng
            }
            mymap.removeLayer(marker);
            marker = new L.marker([e.latlng.lat, e.latlng.lng]).addTo(mymap);
            store.dispatch("reverseAddress", coords);
        });
    }
}

export default new Map;