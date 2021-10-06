import httpErrorHandler from '../httpErrorHandler';
import axios from "axios";
import popup from '../../services/popup';
import router from "../../router/index";
import OneSignal from 'onesignal-cordova-plugin';

const URL_API = "http://192.168.1.47:3000/";

const moduleAuth = {
    state: () => ({
        token: null,
        userInformation: null,
        userIsLoggedIn: false,
        device: {}
    }),

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
        setDevice(state, device) {
            state.device = device;
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
    },

    actions: {
        async getDevice({ commit, state }) {
            await OneSignal.getDeviceState(function (stateChanges) {
                commit("setDevice", stateChanges);
                console.log("Info device => ", state.device);
            });
        },

        async setExternalUserId({ getters }) {
            const externalUserId = getters.getUserInformation.id;
            console.log("extenraluserid =>", externalUserId);
            await OneSignal.setExternalUserId(externalUserId, (results) => {
                // The results will contain push and email success statuses
                console.log('Results of setting external user id');
                console.log(results);

                // Push can be expected in almost every situation with a success status, but
                // as a pre-caution its good to verify it exists
                if (results.push && results.push.success) {
                    console.log('Results of setting external user id push status:');
                    console.log(results.push.success);
                }
            });
        },

        async removeExternalUserId() {
            OneSignal.removeExternalUserId((results) => {
                // The results will contain push and email success statuses
                console.log('Results of removing external user id');
                console.log(results);
                // Push can be expected in almost every situation with a success status, but
                // as a pre-caution its good to verify it exists
                if (results.push && results.push.success) {
                    console.log('Results of removing external user id push status:');
                    console.log(results.push.success);
                }
            });
        },

        async loginUser({ dispatch, commit }, user) {
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
                    dispatch("getDevice");
                    commit("setUserIsLoggedIn", true);
                    commit("setToken", resp.data.token);
                    commit("setUserInformation", JSON.stringify(resp.data.informations));
                    dispatch("setExternalUserId");
                    popup.success("Authentification réussie !");
                    // router.push({
                    //     name: "Home",
                    // });
                }
            })
                .catch(httpErrorHandler);
        },

        async logoutUser({ commit }) {
            localStorage.clear();
            commit("setUserIsLoggedIn", false);
            commit("setToken", null);
            commit("setUserInformation", null);
            // dispatch("removeExternalUserId");
            popup.success("Vous êtes déconnectés");
            router.push({ name: "Home" });
        }
    }
}
export default moduleAuth;