// import { Http } from '@capacitor-community/http';
import store from '../store/store';
import popup from './popup';
import axios from "axios";
// import jwt_decode from "jwt-decode";

const URL_API = "http://192.168.1.47:3000/";

class APIProvider {

    loginUser(email, password) {
        axios({
            method: "post",
            url: URL_API + 'users/login',
            data: {
                email: email,
                password: password
            },
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            }
        }).then(resp => {
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

        // const options = {
        //     method: "post",
        //     url: URL_API + 'login',
        //     headers: {
        //         Accept: "application/json",
        //         "Content-type": "application/json",
        //     },
        //     data: {
        //         email: email,
        //         password: password,
        //     },
        // };

        // const resp = Http.post(options)
        //     .then((resp) => {
        //         // Use library community/storage if necessary...
        //         // Storage.set({
        //         //     key: "token",
        //         //     value: resp.data.token,
        //         // });

        //         if (resp.status === 200) {
        //             store.commit("setUserIsLoggedIn", true);
        //             store.commit("setToken", resp.data.token);
        //             store.commit("setUserInformation", JSON.stringify(resp.data.informations));
        //             popup.success("Vous êtes connectés");
        //         }
        //         if (resp.status === 400) {
        //             popup.warning("Cette adresse n'a pas été enregistré !");
        //         }
        //         if (resp.status === 401) {
        //             popup.error("Mauvais mot de passe !");
        //         }
        //     })
        //     .catch((err) => console.log(err));
        // return resp;
    }
}

export default new APIProvider;