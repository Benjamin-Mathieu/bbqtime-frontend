// import httpErrorHandler from '../httpErrorHandler';
import popup from '../../components/ToastController';
import router from "../../router/index";
import OneSignal from 'onesignal-cordova-plugin';
import { request } from '../httpRequest';
import { HTTP as Http } from '@ionic-native/http';

const moduleAuth = {
    state: () => ({
        token: localStorage.getItem('token') || null,
        userInformation: null,
        userIsLoggedIn: false,
        userTmp: null,
        device: {},
        resetPassword: {}
    }),

    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setUserInformation(state, userInformation) {
            state.userInformation = userInformation;
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
            let externalUserId = getters.getUserInformation.id;
            console.log("extenraluserid =>", externalUserId);
            await OneSignal.setExternalUserId(encodeURI(externalUserId), (results) => {
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
            await request.post(`users/login`, {
                email: user.email,
                password: user.password
            }).then(resp => {
                console.log("test result => ", resp);
                dispatch("getDevice");
                commit("setUserIsLoggedIn", true);
                commit("setToken", resp.token);
                commit("setUserInformation", JSON.stringify(resp.informations));
                dispatch("setExternalUserId");
                localStorage.setItem("token", resp.token);

                popup.success(resp.message);
                router.push({ name: "Home" });

                if (resp.informations.name === "" || resp.informations.firstname === "") {
                    popup.warning("Votre profil est incomplet !");
                    router.push({ name: "Account" });
                }
            })
                .catch(err => {
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                });
        },

        async userIsLogged({ commit, dispatch }) {
            await Http.get("users/isLogged", "", {
                "Accept": "application/json",
                "Content-type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }).then(resp => {
                if (resp.userIsLogged) {
                    dispatch("getDevice");
                    commit("setUserIsLoggedIn", true);
                    commit("setToken", localStorage.getItem("token"));
                    commit("setUserInformation", JSON.stringify(resp.informations));
                    dispatch("setExternalUserId");
                    popup.success(resp.message);
                }
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

        async registerUser({ state, dispatch }) {
            await request.post(`users`, {
                email: state.userTmp.email,
                password: state.userTmp.password,
                name: state.userTmp.name,
                firstname: state.userTmp.firstname,
                phone: state.userTmp.phone
            }).then(async resp => {
                popup.success(resp.message);
                const user = { "email": state.userTmp.email, "password": state.userTmp.password };
                await dispatch("loginUser", user);
                router.push({ name: "Account" });
            })
                .catch(err => {
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                })
        },

        async sendCode({ state }) {
            let isSend;

            await request.post('users/send-code', {
                email: state.resetPassword.email,
            })
                .then(resp => {
                    console.log("resp => ", resp);
                    popup.success(resp.message);
                    isSend = true;
                })
                .catch(err => {
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                    isSend = false;
                })

            return isSend;
        },

        async verifCode({ state, commit }, code) {
            let codeIsOk;

            await request.post('users/check-code',
                {
                    email: state.resetPassword.email,
                    code: code
                }
            )
                .then(resp => {
                    popup.success(resp.message);
                    commit("setResetPassword", resp.token);
                    codeIsOk = true;
                })
                .catch(err => {
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                    codeIsOk = false;
                })

            return codeIsOk;
        },

        async resetPassword({ state }, password) {
            await request.postResetPwd('users/reset-password',
                {
                    new_password: password
                },
                {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${state.resetPassword}`
                })
                .then(resp => {
                    popup.success(resp.message);
                    router.push({
                        name: "SignIn",
                    });
                })
                .catch(err => {
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                });
        },

        async updateProfil({ commit }, data) {
            let isUpdate;

            await request.putWithAuth('users/update', data)
                .then(resp => {
                    popup.success(resp.message);
                    commit("setUserInformation", JSON.stringify(resp.informations));
                    isUpdate = true;
                })
                .catch(err => {
                    isUpdate = false;
                    err.error = JSON.parse(err.error);
                    popup.warning(err.error.message);
                })

            return isUpdate;
        }
    }
}
export default moduleAuth;