// import httpErrorHandler from '../httpErrorHandler';
import { request } from '../httpRequest';
import popup from '../../components/ToastController';
import router from "../../router/index";


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
            await request.getWithAuth('events/archive')
                .then(resp => {
                    commit("setArchivedEvents", resp.events);
                })
        },

        async getParticipateEvents({ commit }, page) {
            if (page === undefined) page = "1";

            await request.getWithAuth('events/participate/' + page)
                .then(resp => {
                    commit("setParticipateEvents", resp.events);
                    const pagination = { count: resp.count, currentPage: resp.currentPage, totalPages: resp.totalPages };
                    commit("setPagination", pagination);
                })
                .catch(err => {
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                })
        },

        async getPublicEvents({ commit, rootState }, page) {
            if (page === undefined) page = "1";

            if (rootState.auth.userIsLoggedIn) {
                await request.getWithAuth('events/public/' + page)
                    .then(resp => {
                        commit("setPublicEvents", resp.events);
                        const pagination = { count: resp.count, currentPage: resp.currentPage, totalPages: resp.totalPages };
                        commit("setPagination", pagination);
                    })
                    .catch(err => {
                        err.error = JSON.parse(err.error);
                        popup.warning(err.error.message);
                    });
            } else {
                await request.get('events/public/' + page)
                    .then(resp => {
                        commit("setPublicEvents", resp.events);
                        const pagination = { count: resp.count, currentPage: resp.currentPage, totalPages: resp.totalPages };
                        commit("setPagination", pagination);
                    })
                    .catch(err => {
                        err.error = JSON.parse(err.error);
                        popup.warning(err.error.message);
                    });
            }
        },

        async getMyEvents({ commit }) {
            await request.getWithAuth('events/myEvents')
                .then(resp => {
                    commit("setMyEvents", resp.events)
                });
        },

        async getEventDetails({ commit }, id) {
            let params;
            if (!id) {
                params = router.currentRoute.value.params.id;
            }

            await request.getWithAuth('events/' + (params !== undefined ? params : id))
                .then(resp => {
                    commit("setEventDetails", resp.event);
                })
                .catch(err => {
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                });
        },

        async duplicateEvent({ state, commit }, id) {
            await request.postWithAuth('events/duplicate', { id: id })
                .then(async resp => {
                    // URL TO OBJECT FILE
                    // const response = await fetch(resp.event.photo_url);
                    // const blob = await response.blob();
                    // const file = new File([blob], "image.jpg", { type: blob.type });

                    await commit("setEventTmp", resp.event);
                    // state.eventTmp.fileFromServer = file;
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
            await request.getWithAuth('events/join/' + password)
                .then(resp => {
                    commit("setEventDetails", resp.event);
                    router.push({
                        name: "Categories",
                        params: { id: state.eventDetails.id },
                    });
                    popup.success(resp.message);
                })
                .catch(() => {
                    popup.error("Aucun évènement n'est lié à ce QR Code, réessayez !");
                    if (router.currentRoute.value.name == "Scan") dispatch("scan");
                });
        },

        async getMyEventDetails({ commit }, id) {
            await request.getWithAuth('events/myEvents/' + id)
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

            await request.getWithAuth('events/myEvents/' + params + '/orders')
                .then(resp => {
                    commit("setMyEventOrders", resp.orders)
                })
                .catch(err => {
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                });
        },

        async postEvent({ commit, state }, event) {
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

            await request.postWithFile('events', formData)
                .then(async resp => {
                    // URL TO Blob
                    const response = await fetch(resp.event.photo_url);
                    const blob = await response.blob();
                    // const file = new File([blob], "image.jpg", { type: blob.type });

                    await commit("setEventTmp", resp.event);
                    state.eventTmp.fileFromServer = blob;
                    popup.success(resp.message);
                    commit("setCurrentStep", 2);
                })
                .catch(err => {
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                });
        },

        async getEvent({ commit, state }, id) {
            await request.getWithAuth('events/' + id)
                .then(async resp => {
                    commit("setEventTmp", resp.event);

                    // URL TO OBJECT FILE
                    const response = await fetch(resp.event.photo_url);
                    const blob = await response.blob();
                    // const file = new File([blob], "image.jpg", { type: blob.type });
                    state.eventTmp.fileFromServer = blob;
                }).catch(err => {
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                });
        },

        async putEvent({ commit, state }, event) {
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

            await request.putWithFile('events/update', formData)
                .then(async resp => {
                    // URL TO OBJECT FILE
                    const response = await fetch(resp.event.photo_url);
                    const blob = await response.blob();
                    // const file = new File([blob], "image.jpg", { type: blob.type });

                    await commit("setEventTmp", resp.event);
                    state.eventTmp.fileFromServer = blob;
                    popup.success(resp.message);
                    commit("setCurrentStep", 2);
                })
                .catch(err => {
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                });
        },

        async sendInvitation({ state }, email) {
            await request.postWithAuth('events/mail/invitation', {
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
            await request.postWithAuth('events/addAssociate', {
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