import "leaflet/dist/leaflet.css";
import L from "leaflet";
import store from "../store/store";


class Map {
    getMap() {
        let latitude =
            store.state.respApiAddress.features[0].geometry.coordinates[1];
        let longitude =
            store.state.respApiAddress.features[0].geometry.coordinates[0];

        let mymap = L.map("mapid").setView([latitude, longitude], 18);

        let openStreetMapLayer = L.tileLayer(
            "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
            {
                attribution:
                    '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 100,
                id: "mapbox/satellite-v9",
                tileSize: 512,
                zoomOffset: -1,
                accessToken:
                    "pk.eyJ1IjoiYmVuamFtaW5tdGgiLCJhIjoiY2t0aWtjbGl4MTJzejJ2anltaDNrbWp1NiJ9.jk8rl_a8DFfjmNeRjB0-ig",
            }
        ).addTo(mymap);

        L.marker([latitude, longitude]).addTo(mymap);

        mymap.addLayer(openStreetMapLayer);

        mymap.on("click", function (e) {
            var myIcon = L.icon({
                iconUrl: "../../public/assets/icon/location_on_black_24dp.svg",
                iconSize: [38, 95],
                iconAnchor: [22, 94],
                popupAnchor: [-3, -76],
                shadowUrl: "my-icon-shadow.png",
                shadowSize: [68, 95],
                shadowAnchor: [22, 94],
            });

            L.marker([e.latlng.lat, e.latlng.lng], { icon: myIcon }).addTo(mymap);
        });
    }
}

export default new Map;