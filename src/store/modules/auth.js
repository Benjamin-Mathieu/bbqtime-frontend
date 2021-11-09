// import httpErrorHandler from '../httpErrorHandler';
import popup from '../../components/ToastController';
import router from "../../router/index";
import OneSignal from 'onesignal-cordova-plugin';
import { http } from '@ionic-native/http';

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
            try {
                const resp = await http.get(
                    URL_API + 'users/login',
                    {
                        email: user.email,
                        password: user.password
                    },
                    {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    }
                );
                console.log("resp login => ", resp);

                dispatch("getDevice");
                commit("setUserIsLoggedIn", true);
                commit("setToken", resp.data.token);
                commit("setUserInformation", JSON.stringify(resp.data.informations));
                dispatch("setExternalUserId");
                popup.success(resp.data.message);
                router.push({ name: "Home" });

                if (resp.data.informations.name === "" || resp.data.informations.firstname === "") {
                    popup.warning("Votre profil est incomplet !");
                    router.push({ name: "Account" });
                }
            } catch (error) {
                popup.error(error);
            }
        },

        async userIsLogged({ dispatch, commit }) {
            try {
                const resp = await Http.get({
                    url: URL_API + 'users/isLogged',
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (resp.data.userIsLogged) {
                    dispatch("getDevice");
                    commit("setUserIsLoggedIn", true);
                    commit("setToken", localStorage.getItem("token"));
                    commit("setUserInformation", JSON.stringify(resp.data.informations));
                    dispatch("setExternalUserId");
                    popup.success(resp.data.message);
                }
            } catch (error) {
                popup.error(error);
            }
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

        async registerUser({ state, dispatch }) {
            try {
                const resp = await Http.post({
                    url: URL_API + 'users',
                    data: {
                        email: state.userTmp.email,
                        password: state.userTmp.password,
                        name: state.userTmp.name,
                        firstname: state.userTmp.firstname,
                        phone: state.userTmp.phone
                    },
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    }
                });

                await popup.success(resp.data.message);
                const user = { "email": state.userTmp.email, "password": state.userTmp.password };
                dispatch("loginUser", user);
                router.push({ name: "Account" });
            } catch (error) {
                popup.error(error);
            }

        },

        async sendCode({ state }) {
            try {
                const req = await Http.post({
                    url: URL_API + 'users/send-code',
                    data: {
                        email: state.resetPassword.email,
                    },
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    }
                });

                if (req.status === 200) {
                    popup.success(req.data.message);
                    return true;
                }

            } catch (error) {
                popup.error(error);
            }
        },

        async verifCode({ state, commit }, code) {
            try {
                const req = await Http.post({
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

                if (req.status === 200) {
                    popup.success(req.data.message);
                    commit("setResetPassword", req.data.token);
                    return true;
                } else {
                    popup.warning(req.data.message);
                    return false;
                }

            } catch (error) {
                console.error(error);
            }

        },

        async resetPassword({ state }, password) {
            try {
                const req = await Http.post({
                    url: URL_API + 'users/reset-password',
                    data: {
                        new_password: password
                    },
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${state.resetPassword}`
                    }
                });

                popup.success(req.data.message);
                router.push({
                    name: "SignIn",
                });

            } catch (error) {
                popup.error(error);
            }
        },

        async updateProfil({ commit }, data) {
            try {
                const req = await Http.put({
                    url: URL_API + 'users/update',
                    data: { data },
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (req.status === 200) {
                    popup.success(req.data.message);
                    commit("setUserInformation", JSON.stringify(req.data.informations));
                    return true;
                } else {
                    popup.warning(req.data.message);
                    return false;
                }
            } catch (error) {
                console.log("error => ", error);
            }
        }
    }
}
export default moduleAuth;