import { createStore } from 'vuex';
// import APIProvider from '../services/api';
import axios from "axios";

// Create a new store instance.
const store = createStore({
    state() {
        return {
            token: null,
            userInformation: null,
            userIsLoggedIn: null,
            events: {},
            orders: [],
            categories: [],
            menus: []
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
            // Object.keys(event).forEach(key => {
            // Vue.set(state.events, key, event[key]);
            // })
            state.events = event;
        },
        setOrders(state, orders) {
            state.orders = orders
        },
        setCategories(state, categorie) {
            state.categories.push(categorie)
        },
        setMenus(state, menu) {
            state.menus.push(menu)
        }
    },
    getters: {
        getLoginStatus(state) {
            if (state.userIsLoggedIn) {
                return "Connected"
            } else {
                return "Disconnected"
            }
        },
        categories: state => {
            return state.categories;
        },
        events: state => {
            return state.events;
        },
        menus: state => {
            return state.menus;
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
        async getCategories({ commit }) {
            let req = await axios({
                method: "get",
                url: 'http://localhost:3000/categories',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
            commit("setCategories", req.data.categories)
        },

        async postEvent({ state }) {
            await axios({
                method: "post",
                url: 'http://localhost:3000/events',
                data: {
                    name: state.events.name,
                    address: state.events.address,
                    city: state.events.city,
                    zipcode: state.events.zipcode,
                    date: "2021-08-30 20:30:00",
                    description: state.events.description,
                    photo_url: "public/uploads/event.png",
                    private: state.events.private,
                },
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
        },

        async postCategorie({ state }) {
            await state.categories.forEach(categorie => {
                axios({
                    method: "post",
                    url: 'http://localhost:3000/categories',
                    data: {
                        libelle: categorie
                    },
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    }
                });
            });
        },

        async postMenu({ state }) {
            await state.menus.forEach(menu => {
                axios({
                    method: "post",
                    url: 'http://localhost:3000/plats',
                    data: {
                        libelle: menu.libelle,
                        price: menu.price,
                        description: menu.description,
                        quantity: menu.quantity,
                        category_id: 8,
                        event_id: 35,
                        photo_url: "public/uploads/menu.jpg"
                    },
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    }
                })
            })
        },
    }
});

export default store;