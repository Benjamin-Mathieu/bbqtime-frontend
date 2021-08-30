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
            orders: []
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
        }
    }
});

export default store;