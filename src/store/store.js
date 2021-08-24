import { createStore } from 'vuex';
import APIProvider from '../services/api';

// Create a new store instance.
const store = createStore({
    state() {
        return {
            token: false,
            userInformation: false,
        };
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        setUserInformation(state, userInformation) {
            state.userInformation = userInformation
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