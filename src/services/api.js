import { Http } from '@capacitor-community/http';
import store from '../store/store';

const API_URL = "http://localhost:3000";
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsIm5hbWUiOiJCZW5qYW1pbiIsImZpcnN0bmFtZSI6Ik1hdGhpZXUiLCJlbWFpbCI6InRlc3Rwb3N0QGdtYWlsLmNvbSIsImlhdCI6MTYyOTcwMzc4NX0.QpopJd7TunSMIzWXzvN-4GSLyNsZ-djXZc5bFgyCweM';

class APIProvider {
    getUsers() {
        const options = {
            url: API_URL + '/users'
        };

        Http.get(options)
            .then(resp => console.log(resp.data))
            .catch(err => console.log(err));
    };

    getEvents() {
        const options = {
            url: API_URL + '/events',
            headers: {
                'Authorization': 'Bearer ' + store.state.token
            }
        };

        Http.get(options)
            .then(resp => console.log(resp.data))
            .catch(err => console.log(err));
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