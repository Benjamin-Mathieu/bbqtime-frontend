import { createStore } from 'vuex';
// import APIProvider from '../services/api';
import axios from "axios";
import popup from '../services/popup';

// Create a new store instance.
const store = createStore({
    state() {
        return {
            token: null,
            userInformation: null,
            userIsLoggedIn: null,
            events: [],
            myEvents: [],
            eventTmp: {},
            eventDetails: [],
            orders: [],
            orderDetails: [],
            categories: [],
            categoryIdTmp: {},
            plats: [],
            shop: []
        };
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem("token", token);
        },
        setUserInformation(state, userInformation) {
            state.userInformation = userInformation;
            localStorage.setItem("userInformation", userInformation);
        },
        setUserIsLoggedIn(state, userIsLoggedIn) {
            state.userIsLoggedIn = userIsLoggedIn
        },
        setEvents(state, event) {
            if (Object.keys(event).length > 0) {
                state.events.push(event);
            }
        },
        setMyEvents(state, myEvents) {
            state.myEvents = myEvents;
        },
        setEventTmp(state, eventTmp) {
            state.eventTmp = eventTmp;
        },
        setEventDetails(state, eventDetails) {
            state.eventDetails = eventDetails;
        },
        setOrders(state, orders) {
            state.orders = orders
        },
        setOrderDetails(state, orderDetails) {
            state.orderDetails = orderDetails;
        },
        setCategories(state, categorie) {
            state.categories.push(categorie)
        },
        setCategoryIdTmp(state, categorieId) {
            state.categoryIdTmp = categorieId
        },
        setPlats(state, plat) {
            state.plats = plat;
        },
        setShop(state, plat) {
            if (state.shop.includes(plat)) {
                state.shop.qty = plat.qty++;
            } else {
                state.shop.push(plat);
            }
        }
    },
    getters: {
        getLoginStatus(state) {
            if (state.userIsLoggedIn) {
                return "Connected"
            } else {
                return "Disconnected"
            }
        }
    },
    actions: {
        async getEvents({ commit }) {
            let req = await axios({
                method: "get",
                url: 'http://localhost:3000/events',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
            commit("setEvents", req.data.events)
        },
        async getMyEvents({ commit }) {
            let req = await axios({
                method: "get",
                url: 'http://localhost:3000/events/myEvents',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
            commit("setMyEvents", req.data.events)
        },
        async getOrders({ commit }) {
            let req = await axios({
                method: "get",
                url: 'http://localhost:3000/orders',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
            commit("setOrders", req.data.orders)
        },
        async getPlats({ commit, state }) {
            await axios({
                method: "get",
                url: 'http://localhost:3000/plats/' + state.categoryIdTmp,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }).then(resp => {
                commit("setPlats", resp.data.plats);
            })
        },

        async getCategories({ commit, state }) {
            await axios({
                method: "get",
                url: 'http://localhost:3000/categories/' + state.eventTmp.id,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }).then(resp => {
                resp.data.categories.forEach(categorie => {
                    commit("setCategories", categorie);
                });
            })

        },

        async getEventDetails({ commit }, id) {
            let req = await axios({
                method: "get",
                url: 'http://localhost:3000/events/' + id,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
            commit("setEventDetails", req.data.event);
        },

        async getOrderDetails({ commit }, id) {
            const orderId = Object.values(id.id).toString();
            let req = await axios({
                method: "get",
                url: 'http://localhost:3000/orders/' + orderId,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
            console.log(req.data);
            commit("setOrderDetails", req.data);
        },

        async postEvent({ commit, state }) {
            await axios({
                method: "post",
                url: 'http://localhost:3000/events',
                data: {
                    name: state.eventTmp.name,
                    address: state.eventTmp.address,
                    city: state.eventTmp.city,
                    zipcode: state.eventTmp.zipcode,
                    date: "2021-08-30 20:30:00",
                    description: state.eventTmp.description,
                    photo_url: "public/uploads/event.png",
                    private: state.eventTmp.private,
                },
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }).then(resp => {
                if (resp.status === 201) {
                    commit("setEventTmp", resp.data.event);
                    popup.success("Evènement crée");
                }
            }).catch(() => {
                popup.error("Une erreur est survenue");
            })
        },

        async postCategorie({ commit, state }, libelle) {
            await axios({
                method: "post",
                url: 'http://localhost:3000/categories',
                data: {
                    libelle: libelle,
                    event_id: state.eventTmp.id
                },
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            })
                .then(resp => {
                    if (resp.status === 201) {
                        popup.success("Catégorie ajouté");
                        commit("setCategories", resp.data.categorie[0])
                    }
                })
                .catch(err => {
                    if (err.toString().includes("400")) {
                        popup.warning("Catégorie déjà existante");
                    } else {
                        popup.error("Une erreur est survenue");
                    }
                })
        },

        async postPlat({ state }, plat) {
            axios({
                method: "post",
                url: 'http://localhost:3000/plats',
                data: {
                    libelle: plat.libelle,
                    price: plat.price,
                    description: plat.description,
                    stock: plat.stock,
                    photo_url: plat.photo_url,
                    event_id: state.eventTmp.id,
                    category_id: state.categoryIdTmp
                },
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            })
                .then(resp => {
                    if (resp.status === 201) {
                        popup.success("plat ajouté");
                    }
                    if (resp.status === 500) {
                        popup.error("Une erreur est survenue");
                    }
                })
        },

        postOrder({ state }) {
            axios({
                method: "post",
                url: 'http://localhost:3000/orders',
                data: {
                    event_id: state.eventDetails.id,
                    heure: "2021-09-01 20:30:00",
                    plats: state.shop,
                },
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            })
                .then(resp => {
                    if (resp.status === 201) {
                        popup.success("Commande effectué");
                    }
                }
                ).catch(err => {
                    console.log(err)
                });
        },

    }
});

export default store;