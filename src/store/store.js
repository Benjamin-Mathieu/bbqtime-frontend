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
            events: [],
            orders: [],
            categories: [],
            menus: []
        };
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        setUserInformation(state, userInformation) {
            state.userInformation = userInformation
        },
        setUserIsLoggedIn(state, userIsLoggedIn) {
            state.userIsLoggedIn = userIsLoggedIn
        },
        setEvents(state, event) {
            state.events.push(event)
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
        async postCategorie({ commit }, payload) {
            await axios({
                method: "post",
                url: 'http://localhost:3000/categories',
                data: {
                    libelle: payload
                },
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
            commit("setCategories", payload);
        },
        async postMenu({ commit }, menu) {
            let req = await axios({
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
            });
            commit("setMenus", req.data.menu);
        },

        async postEvent({ commit }, event) {
            console.log(event);
            let req = await axios({
                method: "post",
                url: 'http://localhost:3000/events',
                data: {
                    name: event.name,
                    address: event.address,
                    city: event.city,
                    zipcode: event.zipcode,
                    date: "2021-08-30 20:30:00",
                    description: event.description,
                    photo_url: "public/uploads/event.png",
                    private: event.isPrivate,
                },
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
            console.log("req =>", req);
            commit("setEvents", req.data);

        }
    }
});

export default store;