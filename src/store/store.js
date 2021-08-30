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
        setEvents(state, events) {
            state.events = events
        },
        setOrders(state, orders) {
            state.orders = orders
        },
        setCategories(state, categories) {
            state.categories = categories
        },
        setMenus(state, menus) {
            state.menus = menus
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
    },
    actions: {
        async getEvents({ commit }) {
            let req = await axios({
                method: "get",
                url: 'http://localhost:3000/events',
                headers: {
                    'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsIm5hbWUiOiJCZW5qYW1pbiIsImZpcnN0bmFtZSI6Ik1hdGhpZXUiLCJlbWFpbCI6InRlc3Rwb3N0QGdtYWlsLmNvbSIsImlhdCI6MTYyOTk4NjA0Mn0.FHXlk6qXvkhBjzhlVIFuHxX_U9ui7ca2R4uupCpe6Qo'
                }
            });
            commit("setEvents", req.data.events)
        },
        async getOrders({ commit }) {
            let req = await axios({
                method: "get",
                url: 'http://localhost:3000/orders',
                headers: {
                    'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsIm5hbWUiOiJCZW5qYW1pbiIsImZpcnN0bmFtZSI6Ik1hdGhpZXUiLCJlbWFpbCI6InRlc3Rwb3N0QGdtYWlsLmNvbSIsImlhdCI6MTYyOTk4NjA0Mn0.FHXlk6qXvkhBjzhlVIFuHxX_U9ui7ca2R4uupCpe6Qo'
                }
            });
            commit("setOrders", req.data.orders)
        },
        async getCategories({ commit }) {
            let req = await axios({
                method: "get",
                url: 'http://localhost:3000/categories',
                headers: {
                    'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsIm5hbWUiOiJCZW5qYW1pbiIsImZpcnN0bmFtZSI6Ik1hdGhpZXUiLCJlbWFpbCI6InRlc3Rwb3N0QGdtYWlsLmNvbSIsImlhdCI6MTYyOTk4NjA0Mn0.FHXlk6qXvkhBjzhlVIFuHxX_U9ui7ca2R4uupCpe6Qo'
                }
            });
            commit("setCategories", req.data.categories)
        },
        async postCategorie({ commit }, name) {
            let req = await axios({
                method: "post",
                url: 'http://localhost:3000/categories',
                data: {
                    libelle: name
                },
                headers: {
                    'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsIm5hbWUiOiJCZW5qYW1pbiIsImZpcnN0bmFtZSI6Ik1hdGhpZXUiLCJlbWFpbCI6InRlc3Rwb3N0QGdtYWlsLmNvbSIsImlhdCI6MTYyOTk4NjA0Mn0.FHXlk6qXvkhBjzhlVIFuHxX_U9ui7ca2R4uupCpe6Qo'
                }
            });
            commit("setCategories", req.data.categorie[0].libelle)
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
                    'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsIm5hbWUiOiJCZW5qYW1pbiIsImZpcnN0bmFtZSI6Ik1hdGhpZXUiLCJlbWFpbCI6InRlc3Rwb3N0QGdtYWlsLmNvbSIsImlhdCI6MTYyOTk4NjA0Mn0.FHXlk6qXvkhBjzhlVIFuHxX_U9ui7ca2R4uupCpe6Qo'
                }
            });
            commit("setMenus", req.data.menu)
        }
    }
});

export default store;