import { Http } from '@capacitor-community/http';

class APIProvider {
    getUsers() {
        const options = {
            url: 'http://localhost:3000/users',
        };

        const response = Http.get(options)
            .then(data => console.log(data))
            .catch(err => console.log(err));
        return response;
        // or...
        // const response = await Http.request({ ...options, method: 'GET' })
    };
}

export default new APIProvider;