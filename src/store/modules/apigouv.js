import axios from "axios";
import Map from "../../services/map";

const moduleApiGouv = {
    state: () => ({
        address: "",
        respApiAddress: {}
    }),

    mutations: {
        setAddress(state, address) {
            state.address = address;
        },
        setApiAddress(state, respApi) {
            state.respApiAddress = respApi;
        }
    },

    getters: {
        getAddress(state) {
            if (Object.keys(state.respApiAddress).length > 0) {
                return state.respApiAddress.features[0].properties;
            } else {
                return state.respApiAddress;
            }
        },
    },

    actions: {
        getAddress({ commit, state }) {
            axios({
                method: "get",
                url: 'https://api-adresse.data.gouv.fr/search/?q=' + state.address + "&autocomplete=1",
            })
                .then(resp => {
                    commit("setApiAddress", resp.data);
                    const latitude = resp.data.features[0].geometry.coordinates[1];
                    const longitude = resp.data.features[0].geometry.coordinates[0];
                    Map.getMap(latitude, longitude);
                }
                ).catch(err => {
                    console.log(err)
                });
        }
    }
}
export default moduleApiGouv;