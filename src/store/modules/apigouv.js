import httpErrorHandler from "../httpErrorHandler";
import { request } from '../httpRequest';
import popups from "../../components/ToastController";

const moduleApiGouv = {
    state: () => ({
        address: "",
        respApiAddress: {},
        publicEvents: []
    }),

    mutations: {
        setAddress(state, address) {
            state.address = address;
        },

        setApiAddress(state, respApi) {
            state.respApiAddress = respApi;
        },

        setInfoPublicEvents(state, events) {
            state.publicEvents.push(events);
        },
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
        },

        async getCoordsPublicEvents({ commit, rootState, state }) {
            console.log("in action getCoords");
            let events = [];
            if (state.publicEvents.length > 0) {
                console.log("in if .length > 0");
                state.publicEvents = [];
            }

            await rootState.events.allPublicEvents.forEach(publicEvent => {
                events.push({
                    informations: {
                        name: publicEvent.name,
                        date: publicEvent.date,
                        description: publicEvent.description,
                        fullAddress: `${publicEvent.address} ${publicEvent.city} ${publicEvent.zipcode}`,
                        id: publicEvent.id
                    }
                });
            });

            console.log("events in action => ", events);

            events.forEach(async (event) => {
                await request.getApiGouv('https://api-adresse.data.gouv.fr/search/?q=' + event.informations.fullAddress)
                    .then(async resp => {
                        commit("setInfoPublicEvents", {
                            coords: resp.features[0].geometry.coordinates,
                            informations: event.informations
                        });
                    })
                    .catch(httpErrorHandler)
            });

            console.log("state.publicEvents => ", state.publicEvents);
        }
    }
}
export default moduleApiGouv;