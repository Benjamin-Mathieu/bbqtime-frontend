import { createStore } from 'vuex';
import httpErrorHandler from './httpErrorHandler';
import axios from "axios";
import popup from '../services/popup';
import router from "../router/index";
import Map from "../services/map";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Camera } from '@capacitor/camera';


const URL_API = "http://192.168.1.47:3000/";


// Create a new store instance.
const store = createStore({
    state() {
        return {
            token: null,
            userInformation: null,
            userIsLoggedIn: false,
            address: "",
            respApiAddress: {},
            events: [],
            myEvents: [],
            myEventDetails: [],
            eventTmp: {},
            eventDetails: [],
            orders: [],
            orderDetails: [],
            categories: [],
            categoryIdTmp: {},
            plats: [],
            shop: []
        };
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem("token", token);
        },
        setUserInformation(state, userInformation) {
            state.userInformation = userInformation;
            localStorage.setItem("userInformation", userInformation);
        },
        setUserIsLoggedIn(state, userIsLoggedIn) {
            state.userIsLoggedIn = userIsLoggedIn
        },
        setAddress(state, address) {
            state.address = address;
        },
        setApiAddress(state, respApi) {
            state.respApiAddress = respApi;
        },
        setEvents(state, events) {
            state.events = events;
        },
        setMyEvents(state, myEvents) {
            state.myEvents = myEvents;
        },
        setMyEventDetails(state, details) {
            state.myEventDetails = details;
        },
        setEventTmp(state, eventTmp) {
            state.eventTmp = eventTmp;
        },
        setEventDetails(state, eventDetails) {
            state.eventDetails = eventDetails;
        },
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
        },
        setShop(state, plat) {
            if (!state.shop.includes(plat)) {
                state.shop.push(plat);
                popup.success("Plat ajouté au panier");
            }
        },
        updateShop(state, plat) {
            for (var i = 0; i < state.shop.length; i++)
                if (state.shop[i].id == plat.id) {
                    state.shop[i].qty = plat.qty;
                }
        },
        clearShop(state) {
            state.shop = {}
        },
        removePlatInShop(state, plat) {
            console.log(state, plat);
            for (var i = 0; i < state.shop.length; i++)
                if (state.shop[i].id === plat.id) {
                    state.shop.splice(i, 1);
                }
        }
    },
    getters: {
        getUserInformation(state) {
            return JSON.parse(state.userInformation);
        },
        getLoginStatus(state) {
            if (state.userIsLoggedIn) {
                return true
            } else {
                return false
            }
        },
        getTotalShop(state) {
            let totalOrder = 0;
            if (state.shop.length > 0) {
                state.shop.forEach((plat) => {
                    totalOrder += plat.price * plat.qty;
                });
                return totalOrder;
            } else {
                return totalOrder;
            }

        },
        getNumberItemInShop(state) {
            let numberOfItem = 0;
            if (state.shop.length > 0) {
                state.shop.forEach(() => {
                    numberOfItem++;
                });
                return numberOfItem;
            }
            return numberOfItem;
        },
        getAddress(state) {
            if (Object.keys(state.respApiAddress).length > 0) {
                return state.respApiAddress.features[0].properties;
            } else {
                return state.respApiAddress;
            }
        },
        getCurrentEvent(state) {
            return state.eventDetails;
        },
        getDateEvent(state) {
            if (Object.keys(state.eventDetails).length > 0) {
                //Convert date+hours in DATETIME
                const date = state.eventDetails.date.slice(0, 10);
                const hours = state.eventDetails.date.slice(11, 16);
                return { date, hours }
            }
            return {}
        }
    },
    actions: {
        async loginUser({ commit }, user) {
            await axios({
                method: "post",
                url: URL_API + 'users/login',
                data: {
                    email: user.email,
                    password: user.password
                },
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                }
            }).then(resp => {
                if (resp.status === 200) {
                    commit("setUserIsLoggedIn", true);
                    commit("setToken", resp.data.token);
                    commit("setUserInformation", JSON.stringify(resp.data.informations));
                    popup.success("Authentification réussie !");
                    router.push({
                        name: "Home",
                    });
                }
            })
                .catch(httpErrorHandler);
        },

        async getEvents({ commit }) {
            let req = await axios({
                method: "get",
                url: URL_API + 'events',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
            commit("setEvents", req.data.events)
        },

        async getMyEvents({ commit }) {
            let req = await axios({
                method: "get",
                url: URL_API + 'events/myEvents',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
            commit("setMyEvents", req.data.events)
        },

        async getEventDetails({ commit }) {
            const params = router.currentRoute.value.params.id;

            await axios({
                method: "get",
                url: URL_API + 'events/' + params,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            })
                .then(resp => {
                    commit("setEventDetails", resp.data.event);
                })
                .catch(err => console.log(err))
        },

        async joinEvent({ commit, dispatch, state }, password) {
            await axios({
                method: "get",
                url: URL_API + 'events/join/' + password,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            })
                .then(resp => {
                    commit("setEventDetails", resp.data.event);
                    router.push({
                        name: "Categories",
                        params: { id: state.eventDetails.id },
                    });
                    popup.success("Evènement rejoint");
                })
                .catch(httpErrorHandler).then(() => {
                    if (router.currentRoute.value.name == "Scan") dispatch("scan");
                });
        },

        async getMyEventDetails({ commit }, id) {
            let req = await axios({
                method: "get",
                url: URL_API + 'events/myEvents/' + id,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
            commit("setMyEventDetails", req.data)
        },

        async getOrders({ commit }) {
            let req = await axios({
                method: "get",
                url: URL_API + 'orders',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
            commit("setOrders", req.data.orders)
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

        async postEvent({ commit, state }) {
            let formData = new FormData();
            formData.append("name", state.eventTmp.name);
            formData.append("address", state.eventTmp.address);
            formData.append("city", state.eventTmp.city);
            formData.append("zipcode", state.eventTmp.zipcode);
            formData.append("date", state.eventTmp.date);
            formData.append("description", state.eventTmp.description);
            formData.append("private", state.eventTmp.private);
            formData.append("password", state.eventTmp.password);
            formData.append("image", state.eventTmp.file, state.eventTmp.file.name);

            await axios({
                method: "post",
                url: URL_API + 'events',
                data: formData,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }).then(resp => {
                if (resp.status === 201) {
                    commit("setEventTmp", resp.data.event);
                    popup.success("Evènement crée");
                }
            }).catch(() => {
                popup.error("Une erreur est survenue");
            })
        },

        async postCategorie({ commit, state }, data) {
            console.log("data.file =>", data.file.name);
            let formData = new FormData();
            formData.append("libelle", data.libelle);
            formData.append("event_id", state.eventTmp.id);
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
            formData.append("event_id", state.eventTmp.id);
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
                        popup.success("plat ajouté");
                        state.plats.push(resp.data.plat);
                    }
                    if (resp.status === 500) {
                        popup.error("Une erreur est survenue");
                    }
                })
        },

        postOrder({ commit, state }) {
            axios({
                method: "post",
                url: URL_API + 'orders',
                data: {
                    event_id: state.eventDetails.id,
                    heure: "2021-09-01 20:30:00",
                    plats: state.shop,
                },
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            })
                .then(resp => {
                    if (resp.status === 201) {
                        popup.success("Commande effectué");
                        commit("clearShop");
                    }
                }
                ).catch(err => {
                    console.log(err)
                });
        },

        getAddress({ commit, state }) {
            axios({
                method: "get",
                url: 'https://api-adresse.data.gouv.fr/search/?q=' + state.address + "&autocomplete=1",
            })
                .then(resp => {
                    commit("setApiAddress", resp.data);
                    const latitude =
                        resp.data.features[0].geometry.coordinates[1];
                    const longitude =
                        resp.data.features[0].geometry.coordinates[0];
                    Map.getMap(latitude, longitude);
                }
                ).catch(err => {
                    console.log(err)
                });
        },

        scan({ dispatch }) {
            BarcodeScanner.prepare();

            // request permissions
            const requestPermissions = async () => {
                const permissions = await Camera.requestPermissions({ permissions: "camera" });
                if (permissions.camera == "denied" || permissions.camera == "prompt-with-rationale") {
                    const c = confirm(
                        `Si vous souhaitez scanner un qrcode: autoriser l'utilisation de votre appareil photo dans les paramètres de l'application.`
                    );
                    if (c) {
                        BarcodeScanner.openAppSettings();
                    } else {
                        popup.warning("Impossible d'effectuer un scan, autorisez l'accès dans les paramètres de l'application");
                    }
                }
            }
            // check permissions
            const checkPermissions = async () => {
                const status = await BarcodeScanner.checkPermission({ force: true });
                console.log("status =>", status);
                if (status.granted) startScan;

                if (status.denied) {
                    requestPermissions();
                }
            }
            checkPermissions();
            BarcodeScanner.hideBackground(); // make background of WebView transparent

            const startScan = BarcodeScanner.startScan()
                .then((res) => {
                    if (res.hasContent) {
                        dispatch("joinEvent", res.content);
                    }
                })
                .catch((err) => console.log(err)); // start scanning and wait for a result
        },

        saveQrcode({ state }) {
            const params = router.currentRoute.value.params.id;
            state.myEvents.forEach((event) => {
                if (event.id == params) {
                    Filesystem.appendFile({
                        path: `${event.name}-${event.id}.png`,
                        data: event.qrcode,
                        directory: Directory.Documents,
                    });
                }
            });
        }
    }
});

export default store;