import { createStore } from 'vuex';
import { request } from "../utils/httpRequest";
import popup from '../components/ToastController';
import modulAuth from "./modules/auth";
import modulApiGouv from "./modules/apigouv";
import modulEvents from './modules/events';
import modulScan from "./modules/scan";
import modulShop from "./modules/shop";
import router from '../router';

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
            await request.getWithAuth('orders')
                .then(resp => {
                    commit("setOrders", resp.orders);
                });
        },

        /** 
        * @typedef {Object} data
        * @property {String} id
        * @property {String} status
        */

        /** 
        * @param {Object} data
        */

        async putOrderStatus({ state }, data) {
            console.log(state.userIsLoggedIn);

            await request.putWithAuth('orders/' + data.id, { status: data.status })
                .then(resp => {
                    popup.success(resp.message);
                }).catch(err => {
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                });
        },

        async getPlats({ commit, rootState }) {
            await request.getWithAuth('categories/' + rootState.events.eventTmp.id)
                .then(resp => {
                    commit("setPlats", resp.plats);
                });
        },

        async getCategories({ commit, rootState }) {
            await request.getWithAuth('categories/' + rootState.events.eventTmp.id)
                .then(resp => {
                    commit("setCategories", resp.categories);
                });
        },

        /** 
        * @param {String} libelle
        */

        async postCategorie({ state, dispatch }, libelle) {
            await request.postWithAuth('categories', {
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

        /** 
        * @typedef {Object} categorie
        * @property {String} id
        * @property {String} libelle
        */

        /** 
        * @param {Object} categorie
        */

        async putCategorie({ dispatch }, categorie) {
            await request.putWithAuth('categories/update', {
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

        /** 
        * @param {String} id
        */

        async deleteCategorie({ store }, id) {
            await request.deleteWithAuth(`categories/delete/${id}`)
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

        /** 
        * @typedef {Object} data
        * @property {String} libelle
        * @property {Float} price
        * @property {String} description
        * @property {Int} stock
        * @property {Int} event_id
        * @property {Int} category_id
        * @property {File} image
        */

        /** 
        * @param {Object} data
        */

        async postPlat({ state, dispatch }, data) {
            let formData = new FormData();
            formData.append("libelle", data.libelle);
            formData.append("price", data.price);
            formData.append("description", data.description);
            formData.append("stock", data.stock);
            formData.append("event_id", state.events.eventTmp.id);
            formData.append("category_id", data.category_id);
            formData.append("image", data.file, data.file.name);

            await request.postWithFile('plats', formData)
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

        /** 
        * @typedef {Object} data
        * @property {String} libelle
        * @property {Float} price
        * @property {String} description
        * @property {Int} stock
        * @property {Int} event_id
        * @property {Int} category_id
        * @property {File} image
        */

        /** 
        * @param {Object} data
        */

        async putPlat({ state, dispatch }, data) {
            let formData = new FormData();
            formData.append("id", data.id);
            formData.append("libelle", data.libelle);
            formData.append("price", data.price);
            formData.append("description", data.description);
            formData.append("stock", data.stock);
            formData.append("event_id", state.events.eventTmp.id);
            formData.append("category_id", data.categoryId);
            if (data.file !== null) {
                formData.append("image", data.file, data.file.name);
            }

            await request.putWithFile('plats/update', formData)
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

        /** 
        * @param {String} id
        */

        async deletePlat({ store }, id) {
            await request.deleteWithAuth(`plats/delete/${id}`)
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
            await request.getWithAuth("events/" + router.currentRoute.value.params.id + "/associate")
                .then(resp => {
                    commit("setListAssociate", resp.associates);
                })
                .catch(err => {
                    console.error(err);
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                });
        },

        /** 
        * @param {String} id
        */

        async deleteAssociate({ dispatch }, id) {
            await request.deleteWithAuth(`events/associate/${id}`)
                .then(resp => {
                    popup.success(resp.message);
                    dispatch("getListAssociate");
                })
                .catch(err => {
                    console.error(err);
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                });
        },

        async getFilesUrlsOfSponsors() {
            return await request.get("img/sponsors/urls");
        }
    }
});

export default store;