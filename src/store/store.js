import { createStore } from 'vuex';
import axios from "axios";
import popup from '../services/popup';
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
        setCategories(state, categorie) {
            state.categories.push(categorie)
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

        async getCategories({ commit, state }) {
            await axios({
                method: "get",
                url: URL_API + 'categories/' + state.eventTmp.id,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }).then(resp => {
                resp.data.categories.forEach(categorie => {
                    commit("setCategories", categorie);
                });
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
            console.log(req.data);
            commit("setOrderDetails", req.data);
        },

        async postCategorie({ commit, state }, data) {
            console.log("data.file =>", data.file.name);
            let formData = new FormData();
            formData.append("libelle", data.libelle);
            formData.append("event_id", state.events.eventTmp.id);
            formData.append("image", data.file, data.file.name);

            await axios({
                method: "post",
                url: URL_API + 'categories',
                data: formData,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(resp => {
                    if (resp.status === 201) {
                        popup.success("Catégorie ajouté");
                        commit("setCategories", resp.data.categorie[0])
                    }
                })
                .catch(err => {
                    if (err.toString().includes("400")) {
                        popup.warning("Catégorie déjà existante");
                    } else {
                        popup.error("Une erreur est survenue");
                    }
                })
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
                        popup.success("Plat ajouté");
                        state.plats.push(resp.data.plat);
                    }
                    if (resp.status === 500) {
                        popup.error("Une erreur est survenue");
                    }
                })
        }
    }
});

export default store;