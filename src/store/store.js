import { createStore } from 'vuex';
import { request } from "../store/httpRequest";
import popup from '../components/ToastController';
import modulAuth from "./modules/auth";
import modulApiGouv from "./modules/apigouv";
import modulEvents from './modules/events';
import modulScan from "./modules/scan";
import modulShop from "./modules/shop";
import router from '../router';

const URL_API = "http://192.168.1.47:3000/";

// Create a new store instance.
const store = createStore({
    modules: {
        auth: modulAuth,
        apiGouv: modulApiGouv,
        events: modulEvents,
        scan: modulScan,
        shop: modulShop
    },
    state() {
        return {
            orders: [],
            orderDetails: [],
            categories: [],
            categoryIdTmp: {},
            plats: [],
            listAssociate: [],
            showOnePage: true
        };
    },
    mutations: {
        setOrders(state, orders) {
            state.orders = orders
        },
        setOrderDetails(state, orderDetails) {
            state.orderDetails = orderDetails;
        },
        setCategories(state, categories) {
            state.categories = categories;
        },
        setCategoryIdTmp(state, categorie) {
            state.categoryIdTmp = categorie
        },
        setPlats(state, plat) {
            state.plats = plat;
        },
        setListAssociate(state, associates) {
            state.listAssociate = associates;
        },
        setShowOnePage(state, boolean) {
            state.showOnePage = boolean;
        }
    },
    actions: {
        async getOrders({ commit }) {
            request.getWithAuth(URL_API + 'orders')
                .then(resp => {
                    commit("setOrders", resp.orders);
                });
        },

        async putOrderStatus({ state }, data) {
            console.log(state.userIsLoggedIn);

            request.putWithAuth(URL_API + 'orders/' + data.id, { status: data.status })
                .then(resp => {
                    popup.success(resp.message);
                }).catch(err => {
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                });
        },

        async getPlats({ commit, rootState }) {
            request.getWithAuth(URL_API + 'categories/' + rootState.events.eventTmp.id)
                .then(resp => {
                    commit("setPlats", resp.plats);
                });
        },

        async getCategories({ commit, rootState }) {
            request.getWithAuth(URL_API + 'categories/' + rootState.events.eventTmp.id)
                .then(resp => {
                    commit("setCategories", resp.categories);
                });
        },

        async getOrderDetails({ commit }, id) {
            const orderId = Object.values(id.id).toString();

            request.getWithAuth(URL_API + 'orders/' + orderId)
                .then(resp => {
                    commit("setOrderDetails", resp);
                });
        },

        async postCategorie({ state, dispatch }, libelle) {
            request.postWithAuth(URL_API + 'categories', {
                event_id: state.events.eventTmp.id,
                libelle: libelle
            })
                .then(resp => {
                    popup.success(resp.message);
                    dispatch("getCategories");
                })
                .catch(err => {
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                });
        },

        async putCategorie({ dispatch }, categorie) {

            request.putWithAuth(URL_API + 'categories/update', {
                id: categorie.id,
                libelle: categorie.libelle
            })
                .then(resp => {
                    popup.success(resp.message);
                    dispatch("getCategories");
                })
                .catch(err => {
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                });
        },

        async deleteCategorie({ store }, id) {
            request.deleteWithAuth(URL_API + `categories/delete/${id}`)
                .then(resp => {
                    console.log(store);
                    popup.success(resp.message);
                })
                .catch(err => {
                    console.error(err);
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                });
        },

        async postPlat({ state, dispatch }, data) {
            let formData = new FormData();
            formData.append("libelle", data.libelle);
            formData.append("price", data.price);
            formData.append("description", data.description);
            formData.append("stock", data.stock);
            formData.append("event_id", state.events.eventTmp.id);
            formData.append("category_id", data.category_id);
            formData.append("image", data.file, data.file.name);

            request.postWithFile(URL_API + 'plats', formData)
                .then(resp => {
                    popup.success(resp.message);
                    dispatch("getCategories");
                })
                .catch(err => {
                    console.error(err);
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                });
        },

        async putPlat({ state, dispatch }, data) {
            let formData = new FormData();
            formData.append("id", data.id);
            formData.append("libelle", data.libelle);
            formData.append("price", data.price);
            formData.append("description", data.description);
            formData.append("stock", data.stock);
            formData.append("event_id", state.events.eventTmp.id);
            formData.append("category_id", data.categoryId);
            formData.append("image", data.file, data.file.name);

            request.putWithFile(URL_API + 'plats/update', formData)
                .then(resp => {
                    popup.success(resp.message);
                    dispatch("getCategories");
                })
                .catch(err => {
                    console.error(err);
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                });
        },

        async deletePlat({ store }, id) {
            request.deleteWithAuth(URL_API + `plats/delete/${id}`)
                .then(resp => {
                    console.log(store);
                    popup.success(resp.message);
                })
                .catch(err => {
                    console.error(err);
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                });
        },

        async getListAssociate({ commit }) {
            request.getWithAuth(URL_API + "events/" + router.currentRoute.value.params.id + "/associate")
                .then(resp => {
                    commit("setListAssociate", resp.associates);
                })
                .catch(err => {
                    console.error(err);
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                });
        },

        async deleteAssociate({ dispatch }, id) {
            request.deleteWithAuth(URL_API + `events/associate/${id}`)
                .then(resp => {
                    popup.success(resp.message);
                    dispatch("getListAssociate");
                })
                .catch(err => {
                    console.error(err);
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                });
        }
    }
});

export default store;