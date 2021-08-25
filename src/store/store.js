import { createStore } from 'vuex';
import APIProvider from '../services/api';

// Create a new store instance.
const store = createStore({
    state() {
        return {
            token: null,
            userInformation: null,
            isLoggedIn: !!localStorage.getItem("user")
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
        },
        getCategories() {
            APIProvider.getCategories();
        }
    }
});

export default store;