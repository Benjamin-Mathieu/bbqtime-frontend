import { createStore } from 'vuex';
import axios from "axios";
import popup from '../components/ToastController';
import httpErrorHandler from './httpErrorHandler';
import modulAuth from "./modules/auth";
import modulApiGouv from "./modules/apigouv";
import modulEvents from './modules/events';
import modulScan from "./modules/scan";
import modulShop from "./modules/shop";

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
            plats: []
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
        }
    },
    actions: {
        async getOrders({ commit }) {
            let req = await axios({
                method: "get",
                url: URL_API + 'orders',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
            commit("setOrders", req.data.orders);
        },

        async putOrderStatus({ state }, data) {
            console.log(state.userIsLoggedIn);
            await axios({
                method: "put",
                url: URL_API + 'orders/' + data.id,
                data: {
                    status: data.status
                },
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
        },

        async getPlats({ commit, state }) {
            await axios({
                method: "get",
                url: URL_API + 'plats/' + state.categoryIdTmp,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }).then(resp => {
                commit("setPlats", resp.data.plats);
            })
        },

        async getCategories({ commit, rootState }) {
            await axios({
                method: "get",
                url: URL_API + 'categories/' + rootState.events.eventTmp.id,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }).then(resp => {
                commit("setCategories", resp.data.categories);
            })

        },

        async getOrderDetails({ commit }, id) {
            const orderId = Object.values(id.id).toString();
            let req = await axios({
                method: "get",
                url: URL_API + 'orders/' + orderId,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
            commit("setOrderDetails", req.data);
        },

        async postCategorie({ state, dispatch }, libelle) {
            console.log("libelle in store ", libelle);
            await axios({
                method: "post",
                url: URL_API + 'categories',
                data: {
                    event_id: state.events.eventTmp.id,
                    libelle: libelle
                },
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'application/json'
                }
            })
                .then(resp => {
                    popup.success(resp.data.message);
                    dispatch("getCategories");
                })
                .catch(httpErrorHandler);
        },

        async putCategorie({ store, dispatch }, categorie) {
            console.log(store);

            await axios({
                method: "put",
                url: URL_API + 'categories/update',
                data: {
                    id: categorie.id,
                    libelle: categorie.libelle
                },
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }).then(resp => {
                popup.success(resp.data.message);
                dispatch("getCategories");
            }).catch((httpErrorHandler))
        },

        async deleteCategorie({ store }, id) {
            await axios({
                method: "delete",
                url: URL_API + 'categories/delete',
                data: {
                    id: id
                },
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }).then(resp => {
                if (resp.status === 200) {
                    console.log(store);
                    popup.success(resp.data.message);
                }
            }).catch((httpErrorHandler))
        },

        async postPlat({ state }, data) {
            let formData = new FormData();
            formData.append("libelle", data.libelle);
            formData.append("price", data.price);
            formData.append("description", data.description);
            formData.append("stock", data.stock);
            formData.append("event_id", state.events.eventTmp.id);
            formData.append("category_id", state.categoryIdTmp);
            formData.append("image", data.file, data.file.name);


            axios({
                method: "post",
                url: URL_API + 'plats',
                data: formData,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            })
                .then(resp => {
                    if (resp.status === 201) {
                        popup.success(resp.data.message);
                        state.plats.push(resp.data.plat);
                    }
                }).catch(httpErrorHandler)
        },

        async putPlat({ state, dispatch }, data) {
            let formData = new FormData();
            formData.append("id", data.id);
            formData.append("libelle", data.libelle);
            formData.append("price", data.price);
            formData.append("description", data.description);
            formData.append("stock", data.stock);
            formData.append("event_id", state.events.eventTmp.id);
            formData.append("category_id", state.categoryIdTmp);
            formData.append("image", data.file, data.file.name);

            await axios({
                method: "put",
                url: URL_API + 'plats/update',
                data: formData,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            })
                .then(resp => {
                    popup.success(resp.data.message);
                    dispatch("getPlats");
                }).catch((httpErrorHandler))
        },

        async deletePlat({ store }, id) {
            await axios({
                method: "delete",
                url: URL_API + 'plats/delete',
                data: {
                    id: id
                },
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }).then(resp => {
                console.log(store);
                popup.success(resp.data.message);
            }).catch((httpErrorHandler))
        },
    }
});

export default store;