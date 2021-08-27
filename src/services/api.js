import { Http } from '@capacitor-community/http';
import store from '../store/store';
// import axios from "axios";
// import jwt_decode from "jwt-decode";

const API_URL = "http://localhost:3000";
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsIm5hbWUiOiJCZW5qYW1pbiIsImZpcnN0bmFtZSI6Ik1hdGhpZXUiLCJlbWFpbCI6InRlc3Rwb3N0QGdtYWlsLmNvbSIsImlhdCI6MTYyOTk4NjA0Mn0.FHXlk6qXvkhBjzhlVIFuHxX_U9ui7ca2R4uupCpe6Qo';

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
                // let decoded = jwt_decode(resp.data.token);
                // Save users data to local storage
                localStorage.setItem("user", JSON.stringify(resp.data));
                localStorage.setItem("token", resp.data.token);

                // Use library community/storage if necessary...
                // Storage.set({
                //     key: "token",
                //     value: resp.data.token,
                // });
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