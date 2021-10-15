import httpErrorHandler from '../httpErrorHandler';
import axios from "axios";
import popup from '../../components/ToastController';
import router from "../../router/index";
import OneSignal from 'onesignal-cordova-plugin';

const URL_API = "http://192.168.1.47:3000/";

const moduleAuth = {
    state: () => ({
        token: null,
        userInformation: null,
        userIsLoggedIn: false,
        userTmp: null,
        device: {},
        resetPassword: {}
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
        setUserTmp(state, userTmp) {
            state.userTmp = userTmp
        },
        setDevice(state, device) {
            state.device = device;
        },
        setResetPassword(state, data) {
            state.resetPassword = data;
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

        async userIsLogged({ dispatch, commit }) {
            await axios({
                method: "get",
                url: URL_API + 'users/isLogged',
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).then(resp => {
                dispatch("getDevice");
                commit("setUserIsLoggedIn", true);
                commit("setUserInformation", JSON.stringify(resp.data.informations));
                dispatch("setExternalUserId");
                popup.success("Authentification réussie !");
            })
                .catch(err => {
                    console.log(err);
                });
        },

        async logoutUser({ commit }) {
            localStorage.clear();
            commit("setUserIsLoggedIn", false);
            commit("setToken", null);
            commit("setUserInformation", null);
            // dispatch("removeExternalUserId");
            popup.success("Vous êtes déconnectés");
            router.push({ name: "Home" });
        },

        async registerUser({ state }) {
            await axios({
                method: "post",
                url: URL_API + 'users',
                data: {
                    email: state.userTmp.email,
                    password: state.userTmp.password,
                    name: state.userTmp.name,
                    firstname: state.userTmp.firstname,
                    phone: state.userTmp.phone,
                    zipcode: state.userTmp.zipcode,
                },
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                }
            }).then(resp => {
                if (resp.status === 201) {
                    popup.success("Compte crée, veuillez-vous connectez");
                    router.push({
                        name: "SignIn",
                    });
                }
            })
                .catch(httpErrorHandler);
        },

        async sendCode({ state }) {
            try {
                const req = await axios({
                    method: "post",
                    url: URL_API + 'users/send-code',
                    data: {
                        email: state.resetPassword.email,
                    },
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    }
                })
                popup.success(req.data.message);
                return true;
            } catch (error) {
                console.error(error);
            }
        },

        async verifCode({ state, commit }, code) {
            try {
                const req = await axios({
                    method: "post",
                    url: URL_API + 'users/check-code',
                    data: {
                        email: state.resetPassword.email,
                        code: code
                    },
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    }
                });
                popup.success(req.data.message);
                commit("setResetPassword", req.data.token);
                return true;
            } catch (error) {
                console.error(error);
            }

        },

        async resetPassword({ state }, password) {
            await axios({
                method: "post",
                url: URL_API + 'users/reset-password',
                data: {
                    new_password: password
                },
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${state.resetPassword}`
                }
            }).then(resp => {
                popup.success(resp.data.message);
                router.push({
                    name: "SignIn",
                });
            })
                .catch(httpErrorHandler);
        },

        async updateProfil({ store }, data) {
            await axios({
                method: "put",
                url: URL_API + 'users/update',
                data: { data },
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).then(resp => {
                console.log(store);
                popup.success(resp.data.message);
            })
                .catch(httpErrorHandler);
        }
    }
}
export default moduleAuth;