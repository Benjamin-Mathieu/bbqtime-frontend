import { Http } from '@capacitor-community/http';

const doGet = () => {
    console.log('doget ok');
    // const options = {
    //     url: 'http://localhost:3000/users',
    //     headers: { 'X-Fake-Header': 'Max was here' },
    //     params: { size: 'XL' },
    // };

    const response = Http.get('http://localhost:3000/users');
    return response;

    // or...
    // const response = await Http.request({ ...options, method: 'GET' })
};

export default doGet;

// class APIProvider {

//     getUsers() {
//         HTTP.get(url + '/users')
//             .then(resp => {
//                 console.log(resp);
//             })
//             .catch(err => console.log(err));
//     }
// }
