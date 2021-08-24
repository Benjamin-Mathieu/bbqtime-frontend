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
        get() {
            let users = APIProvider.getUsers();
            console.log(users);
        }
    }
});

export default store;