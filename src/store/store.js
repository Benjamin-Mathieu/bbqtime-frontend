import { createStore } from 'vuex';
import axios from 'axios';
import doGet from '../services/api';

// Create a new store instance.
const store = createStore({
    state() {
        return {
            api: [],
            token: false,
            userConnected: false,
            urlApi: "http://localhost:3000"
        };
    },
    mutations: {
        api(state) {
            axios.create({
                baseURL: state.urlApi
            });
        },
        setToken(state, token) {
            state.token = token
        },
        setUserConnected(state, userConnected) {
            state.userConnected = userConnected
        },
        SET_GET(state, api) {
            state.api = api
        }
    },
    actions: {
        get() {
            console.log('rrr');
            doGet;
        }
    }
});

export default store;