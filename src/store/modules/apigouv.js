import httpErrorHandler from "../httpErrorHandler";
import { request } from '../httpRequest';
import popups from "../../components/ToastController";

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
        }
    },

    actions: {
        async getAddress({ commit, state }) {
            await request.getApiGouv('https://api-adresse.data.gouv.fr/search/?q=' + state.address.replaceAll(" ", "+"), {}, {})
                .then(async resp => {
                    commit("setApiAddress", resp.features);
                })
                .catch(httpErrorHandler)
        },

        async reverseAddress({ commit }, coords) {
            await request.getApiGouv(`https://api-adresse.data.gouv.fr/reverse/?lon=${coords.lon}&lat=${coords.lat}`)
                .then(resp => {
                    if (resp.features.length === 0) {
                        popups.warning("Aucune addresse n'est lié à cette endroit, veuillez saisir une adresse ou placez de nouveau le curseur sur la carte");
                    } else {
                        console.log("coords leaflet => ", coords);
                        console.log("coord resp => ", resp.features[0].geometry.coordinates);
                        commit("setApiAddress", resp.features);
                    }
                })
                .catch(httpErrorHandler)
        }
    }
}
export default moduleApiGouv;