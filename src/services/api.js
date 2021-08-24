import { Http } from '@capacitor-community/http';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsIm5hbWUiOiJCZW5qYW1pbiIsImZpcnN0bmFtZSI6Ik1hdGhpZXUiLCJlbWFpbCI6InRlc3Rwb3N0QGdtYWlsLmNvbSIsImlhdCI6MTYyOTcwMzc4NX0.QpopJd7TunSMIzWXzvN-4GSLyNsZ-djXZc5bFgyCweM';

class APIProvider {
    getUsers() {
        const options = {
            url: 'http://localhost:3000/users'
        };

        Http.get(options)
            .then(resp => console.log(resp.data))
            .catch(err => console.log(err));
    };

    getEvents() {
        const options = {
            url: 'http://localhost:3000/events',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        Http.get(options)
            .then(resp => console.log(resp.data))
            .catch(err => console.log(err));
    };
}

export default new APIProvider;