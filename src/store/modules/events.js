// import httpErrorHandler from '../httpErrorHandler';
import { request } from '../httpRequest';
import popup from '../../components/ToastController';
import router from "../../router/index";

const URL_API = "http://192.168.1.47:3000/";

const modulEvents = {
    state: () => ({
        archivedEvents: [],
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
        setArchivedEvents(state, archivedEvents) {
            state.archivedEvents = archivedEvents;
        },

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

        async getArchivedEvents({ commit }) {
            request.getWithAuth(URL_API + 'events/archive')
                .then(resp => {
                    commit("setArchivedEvents", resp.events);
                })
        },

        async getParticipateEvents({ commit }, page) {
            if (page === undefined) page = "1";

            request.getWithAuth(URL_API + 'events/participate/' + page)
                .then(resp => {
                    console.log(resp);
                    commit("setParticipateEvents", resp.events);
                    const pagination = { count: resp.count, currentPage: resp.currentPage, totalPages: resp.totalPages };
                    commit("setPagination", pagination);
                })
                .catch(err => {
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                })
        },

        async getPublicEvents({ commit }, page) {
            if (page === undefined) page = "1";

            request.getWithAuth(URL_API + 'events/public/' + page)
                .then(resp => {
                    console.log(resp);
                    commit("setPublicEvents", resp.events);
                    const pagination = { count: resp.count, currentPage: resp.currentPage, totalPages: resp.totalPages };
                    commit("setPagination", pagination);
                })
                .catch(err => {
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                })
        },

        async getMyEvents({ commit }) {
            request.getWithAuth(URL_API + 'events/myEvents')
                .then(resp => {
                    commit("setMyEvents", resp.events)
                });
        },

        async getEventDetails({ commit }, id) {
            let params;
            if (!id) {
                params = router.currentRoute.value.params.id;
            }

            request.getWithAuth(URL_API + 'events/' + (params !== undefined ? params : id))
                .then(resp => {
                    commit("setEventDetails", resp.event);
                })
                .catch(err => {
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                });
        },

        async duplicateEvent({ commit, state }, id) {

            request.postWithAuth(URL_API + 'events/duplicate', { id: id })
                .then(async resp => {
                    // URL TO OBJECT FILE
                    const response = await fetch(resp.event.photo_url);
                    const blob = await response.blob();
                    const file = new File([blob], "image.jpg", { type: blob.type });

                    await commit("setEventTmp", resp.event);
                    state.eventTmp.fileFromServer = file;
                    state.eventTmp.date = new Date().toISOString();
                    popup.success(resp.message);
                    router.push({
                        name: "ManageEvent",
                        params: { id: state.eventTmp.id },
                    });
                }).catch(err => {
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                });
        },

        async joinEvent({ commit, dispatch, state }, password) {
            request.getWithAuth(URL_API + 'events/join/' + password)
                .then(resp => {
                    commit("setEventDetails", resp.event);
                    console.log("resp.data.event", resp.event);
                    console.log("state.eventDetails.id", state.eventDetails.id);
                    router.push({
                        name: "Categories",
                        params: { id: state.eventDetails.id },
                    });
                    popup.success(resp.message);
                })
                .catch(err => {
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                    if (router.currentRoute.value.name == "Scan") dispatch("scan");
                });
        },

        async getMyEventDetails({ commit }, id) {
            request.getWithAuth(URL_API + 'events/myEvents/' + id)
                .then(resp => {
                    commit("setMyEventDetails", resp);
                })
                .catch(err => {
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                });
        },

        async getMyEventOrders({ commit }) {
            const params = router.currentRoute.value.params.id;

            request.getWithAuth(URL_API + 'events/myEvents/' + params + '/orders')
                .then(resp => {
                    commit("setMyEventOrders", resp.orders)
                })
                .catch(err => {
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                });
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

            request.postWithFile(URL_API + 'events', formData)
                .then(async resp => {
                    // URL TO OBJECT FILE
                    const response = await fetch(resp.event.photo_url);
                    const blob = await response.blob();
                    const file = new File([blob], "image.jpg", { type: blob.type });

                    await commit("setEventTmp", resp.event);
                    state.eventTmp.fileFromServer = file;
                    popup.success(resp.message);
                    commit("setCurrentStep", 2);
                })
                .catch(err => {
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                });
        },

        async getEvent({ commit, state }, id) {
            request.getWithAuth(URL_API + 'events/' + id)
                .then(async resp => {

                    console.log("resp in getevent =>", resp);
                    commit("setEventTmp", resp.event);
                    console.log("store in get event", state.eventTmp);

                    // URL TO OBJECT FILE
                    const response = await fetch(resp.event.photo_url);
                    const blob = await response.blob();
                    const file = new File([blob], "image.jpg", { type: blob.type });
                    state.eventTmp.fileFromServer = file;
                }).catch(err => {
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                });
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
            formData.append("image", event.file, event.file.name);

            request.putWithFile(URL_API + 'events/update', formData)
                .then(async resp => {
                    // URL TO OBJECT FILE
                    const response = await fetch(resp.event.photo_url);
                    const blob = await response.blob();
                    const file = new File([blob], "image.jpg", { type: blob.type });

                    await commit("setEventTmp", resp.event);
                    state.eventTmp.fileFromServer = file;
                    popup.success(resp.message);
                    commit("setCurrentStep", 2);
                })
                .catch(err => {
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                });
        },

        async sendInvitation({ state }, email) {
            request.postWithAuth(URL_API + 'events/mail/invitation', {
                event_id: state.eventTmp.id,
                email: email
            })
                .then(resp => {
                    popup.success(resp.message);
                }).catch(err => {
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                });
        },

        async addAdmin({ state }, email) {
            request.postWithAuth(URL_API + 'events/addAssociate', {
                event_id: state.eventTmp.id,
                email: email
            })
                .then(resp => {
                    popup.success(resp.message);
                }).catch(err => {
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                });
        }
    }
}
export default modulEvents;