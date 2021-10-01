import httpErrorHandler from '../httpErrorHandler';
import axios from "axios";
import popup from '../../services/popup';
import router from "../../router/index";

const URL_API = "http://192.168.1.47:3000/";

const modulEvents = {
    state: () => ({
        participateEvents: [],
        publicEvents: [],
        myEvents: [],
        myEventOrders: [],
        myEventDetails: [],
        eventTmp: {},
        eventDetails: [],
        pagination: {}
    }),

    mutations: {
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
            return {}
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

        async getEventDetails({ commit }) {
            const params = router.currentRoute.value.params.id;
            console.log(params);

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
            console.log("password rentré =>", password);
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

        async getMyEventOrders({ commit }) {
            const params = router.currentRoute.value.params.id;

            let req = await axios({
                method: "get",
                url: URL_API + 'events/myEvents/' + params + '/orders',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
            commit("setMyEventOrders", req.data)
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
    }
}
export default modulEvents;