import { Http } from '@capacitor-community/http';
import store from '../store/store';
import popup from './popup';
// import axios from "axios";
// import jwt_decode from "jwt-decode";

const API_URL = "http://localhost:3000";

class APIProvider {

    loginUser(email, password) {
        const options = {
            method: "post",
            url: "http://localhost:3000/users/login",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            data: {
                email: email,
                password: password,
            },
        };

        const resp = Http.post(options)
            .then((resp) => {
                // Use library community/storage if necessary...
                // Storage.set({
                //     key: "token",
                //     value: resp.data.token,
                // });

                if (resp.status === 200) {
                    store.commit("setUserIsLoggedIn", true);
                    store.commit("setToken", resp.data.token);
                    store.commit("setUserInformation", JSON.stringify(resp.data.informations));
                    popup.success("Vous êtes connectés");
                }
                if (resp.status === 400) {
                    popup.warning("Cette adresse n'a pas été enregistré !");
                }
                if (resp.status === 401) {
                    popup.error("Mauvais mot de passe !");
                }
            })
            .catch((err) => console.log(err));
        return resp;
    }

    getUsers() {
        const options = {
            url: API_URL + '/users'
        };

        Http.get(options)
            .then(resp => console.log(resp.data))
            .catch(err => console.log(err));
    };

    getEvents() {
        // const options = {
        //     url: API_URL + '/events',
        //     headers: {
        //         'Authorization': 'Bearer ' + token
        //     }
        // };

        // Http.get(options)
        //     .then(resp => console.log(resp.data))
        //     .catch(err => console.log(err));

        // axios({
        //     method: "get",
        //     url: API_URL + '/events',
        //     headers: {
        //         'Authorization': 'Bearer ' + token
        //     }
        // }).then(resp => {
        //     console.log(resp.data);
        // }).catch(err => console.log(err));
    };


    getEvent(id) {
        const options = {
            url: API_URL + '/events/' + id,
            headers: {
                'Authorization': 'Bearer ' + store.state.token
            }
        };

        Http.get(options)
            .then(resp => console.log(resp.data))
            .catch(err => console.log(err));
    }

    putEvent(id) {
        const options = {
            url: API_URL + '/events/' + id,
            headers: {
                'Authorization': 'Bearer ' + store.state.token
            }
        };

        Http.put(options)
            .then(resp => console.log(resp.data))
            .catch(err => console.log(err));
    }

    deleteEvent(id) {
        const options = {
            url: API_URL + '/events/' + id,
            headers: {
                'Authorization': 'Bearer ' + store.state.token
            }
        };

        Http.delete(options)
            .then(resp => console.log(resp.data))
            .catch(err => console.log(err));
    }

    getCategories() {
        const options = {
            url: API_URL + '/categories',
            headers: {
                'Authorization': 'Bearer ' + store.state.token
            }
        };

        Http.get(options)
            .then(resp => console.log(resp.data))
            .catch(err => console.log(err));
    }
}

export default new APIProvider;