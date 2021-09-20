import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from '../../public/assets/icon/place_red_24dp.svg';

let mymap;

class Map {
    getMap(latitude, longitude) {
        if (mymap) {
            mymap.remove();
        }
        mymap = L.map("mapid").setView([latitude, longitude], 18);

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

        let DefaultIcon = L.icon({
            iconUrl: icon,
            iconSize: [50, 95], // size of the icon
        });
        L.Marker.prototype.options.icon = DefaultIcon;

        L.marker([latitude, longitude]).addTo(mymap);

        mymap.addLayer(openStreetMapLayer);

        // Place marker
        // mymap.on("click", function (e) {
        //     var myIcon = L.icon({
        //         iconUrl: "../../public/assets/icon/location_on_black_24dp.svg",
        //         iconSize: [38, 95],
        //         iconAnchor: [22, 94],
        //         popupAnchor: [-3, -76],
        //         shadowUrl: "my-icon-shadow.png",
        //         shadowSize: [68, 95],
        //         shadowAnchor: [22, 94],
        //     });

        //     L.marker([e.latlng.lat, e.latlng.lng], { icon: myIcon }).addTo(mymap);
        // });
    }
}

export default new Map;