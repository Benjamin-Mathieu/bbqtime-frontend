import Map from "../../services/map";
import httpErrorHandler from "../httpErrorHandler";
import { request } from '../httpRequest';

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
                return state.respApiAddress[0].properties;
            } else {
                return state.respApiAddress;
            }
        },
    },

    actions: {
        async getAddress({ commit, state }) {

            request.getApiGouv('https://api-adresse.data.gouv.fr/search/?q=' + state.address, {}, {})
                .then(async resp => {
                    await commit("setApiAddress", resp.features);
                    const latitude = state.respApiAddress[0].geometry.coordinates[1];
                    const longitude = state.respApiAddress[0].geometry.coordinates[0];
                    Map.getMap(latitude, longitude);
                })
                .catch(httpErrorHandler)
        }
    }
}
export default moduleApiGouv;