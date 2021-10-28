import httpErrorHandler from '../httpErrorHandler';
import axios from "axios";
import popup from '../../components/ToastController';
import router from "../../router/index";

const URL_API = "http://192.168.1.47:3000/";

const modulEvents = {
    state: () => ({
        currentStep: 1,
        participateEvents: [],
        publicEvents: [],
        myEvents: [],
        myEventOrders: {},
        myEventDetails: [],
        eventTmp: {},
        eventDetails: {},
        pagination: {}
    }),

    mutations: {
        setCurrentStep(state, currentStep) {
            state.currentStep = currentStep;
        },
        setParticipateEvents(state, participateEvents) {
            state.participateEvents = participateEvents;
        },
        setPublicEvents(state, publicEvents) {
            state.publicEvents = publicEvents;
        },
        setMyEvents(state, myEvents) {
            state.myEvents = myEvents;
        },
        setMyEventOrders(state, orders) {
            state.myEventOrders = orders;
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
        setPagination(state, pagination) {
            state.pagination = pagination;
        }
    },

    getters: {
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
            return ""
        }
    },

    actions: {
        async getParticipateEvents({ commit }, page) {
            if (page === undefined) page = "1";
            let req = await axios({
                method: "get",
                url: URL_API + 'events/participate/' + page,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
            commit("setParticipateEvents", req.data.events);
            const pagination = { count: req.data.count, currentPage: req.data.currentPage, totalPages: req.data.totalPages };
            commit("setPagination", pagination);
        },

        async getPublicEvents({ commit }, page) {
            if (page === undefined) page = "1";
            let req = await axios({
                method: "get",
                url: URL_API + 'events/public/' + page,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
            commit("setPublicEvents", req.data.events);
            const pagination = { count: req.data.count, currentPage: req.data.currentPage, totalPages: req.data.totalPages };
            commit("setPagination", pagination);
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

        async getEventDetails({ commit }, id) {
            let params;
            if (!id) {
                params = router.currentRoute.value.params.id;
            }

            await axios({
                method: "get",
                url: URL_API + 'events/' + (params !== undefined ? params : id),
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            })
                .then(resp => {
                    commit("setEventDetails", resp.data.event);
                })
                .catch(httpErrorHandler)
        },

        async duplicateEvent({ commit, state }, id) {
            let formData = new FormData();
            formData.append("id", id);
            formData.append("image", state.eventTmp.fileFromServer);

            await axios({
                method: "post",
                url: URL_API + 'events/duplicate',
                data: formData,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token"),
                    "Content-Type": "multipart/form-data"
                }
            })
                .then(async resp => {
                    // URL TO OBJECT FILE
                    const response = await fetch(resp.data.event.photo_url);
                    const blob = await response.blob();
                    const file = new File([blob], "image.jpg", { type: blob.type });

                    await commit("setEventTmp", resp.data.event);
                    state.eventTmp.fileFromServer = file;
                    state.eventTmp.date = new Date().toISOString();
                    popup.success(resp.data.message);
                    router.push({
                        name: "ManageEvent",
                        params: { id: state.eventTmp.id },
                    });
                })
                .catch(httpErrorHandler)
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
                    console.log("resp.data.event", resp.data.event);
                    console.log("state.eventDetails.id", state.eventDetails.id);
                    router.push({
                        name: "Categories",
                        params: { id: state.eventDetails.id },
                    });
                    popup.success(resp.data.message);
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
            commit("setMyEventDetails", req.data);
        },

        async getMyEventOrders({ commit }) {
            const params = router.currentRoute.value.params.id;

            let req = await axios({
                method: "get",
                url: URL_API + 'events/myEvents/' + params + '/orders',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
            commit("setMyEventOrders", req.data.orders)
        },

        async postEvent({ state, commit }, event) {
            let formData = new FormData();
            formData.append("name", event.name);
            formData.append("address", event.address);
            formData.append("city", event.city);
            formData.append("zipcode", event.zipcode);
            formData.append("date", event.date);
            formData.append("description", event.description);
            formData.append("private", event.private);
            formData.append("password", event.password);
            formData.append("image", event.file, event.file.name);

            await axios({
                method: "post",
                url: URL_API + 'events',
                data: formData,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }).then(async (resp) => {
                // URL TO OBJECT FILE
                const response = await fetch(resp.data.event.photo_url);
                const blob = await response.blob();
                const file = new File([blob], "image.jpg", { type: blob.type });

                await commit("setEventTmp", resp.data.event);
                state.eventTmp.fileFromServer = file;
                popup.success(resp.data.message);
                commit("setCurrentStep", 2);

            }).catch((httpErrorHandler))
        },

        async getEvent({ commit, state }, id) {
            let req = await axios({
                method: "get",
                url: URL_API + 'events/' + id,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });

            commit("setEventTmp", req.data.event);
            // URL TO OBJECT FILE
            const response = await fetch(req.data.event.photo_url);
            const blob = await response.blob();
            const file = new File([blob], "image.jpg", { type: blob.type });
            state.eventTmp.fileFromServer = file;
        },

        async putEvent({ state, commit }, event) {
            let formData = new FormData();
            formData.append("id", event.id);
            formData.append("name", event.name);
            formData.append("address", event.address);
            formData.append("city", event.city);
            formData.append("zipcode", event.zipcode);
            formData.append("date", event.date);
            formData.append("description", event.description);
            formData.append("private", event.private);
            formData.append("password", event.password);
            if (event.file) {
                formData.append("image", event.file, event.file.name);
            }

            await axios({
                method: "put",
                url: URL_API + 'events/update',
                data: formData,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            }).then(async (resp) => {
                // URL TO OBJECT FILE
                const response = await fetch(resp.data.event.photo_url);
                const blob = await response.blob();
                const file = new File([blob], "image.jpg", { type: blob.type });

                await commit("setEventTmp", resp.data.event);
                state.eventTmp.fileFromServer = file;
                popup.success(resp.data.message);
                commit("setCurrentStep", 2);
            }).catch((httpErrorHandler))
        },

        async sendInvitation({ state }, email) {
            await axios({
                method: "post",
                url: URL_API + 'events/mail/invitation',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
                data: {
                    event_id: state.eventTmp.id,
                    email: email
                }
            }).then((res) => {
                popup.success(res.data.message);
            }).catch((httpErrorHandler))
        },

        async addAdmin({ state }, email) {
            await axios({
                method: "post",
                url: URL_API + 'events/addAssociate',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                },
                data: {
                    event_id: state.eventTmp.id,
                    email: email
                }
            }).then((res) => {
                popup.success(res.data.message);
            }).catch((httpErrorHandler))
        }
    }
}
export default modulEvents;