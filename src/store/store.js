import { createStore } from 'vuex';
import APIProvider from '../services/api';

// Create a new store instance.
const store = createStore({
    state() {
        return {
            token: false,
            userConnected: false,
        };
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        setUserConnected(state, userConnected) {
            state.userConnected = userConnected
        }
    },
    actions: {
        getUsers() {
            APIProvider.getUsers();
        },
        getEvents() {
            APIProvider.getEvents();
        }
    }
});

export default store;