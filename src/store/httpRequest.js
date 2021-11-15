import { HTTP as Http } from '@ionic-native/http';

const headersWithAuth = {
    "Accept": "application/json",
    "Content-type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`
};

const headers = {
    "Accept": "application/json",
    "Content-type": "application/json",
};

const URL_API = process.env.VUE_APP_URL_API;

const responseBody = (response) => { return JSON.parse(response.data) };

export const request = {
    get: (url, data) => Http.get(encodeURI(URL_API + url), data, headers).then(responseBody),
    post: (url, data) => Http.post(encodeURI(URL_API + url), data, headers).then(responseBody),

    getWithAuth: (url, data) => Http.get(encodeURI(URL_API + url), data, headersWithAuth).then(responseBody),
    postWithAuth: (url, data) => Http.post(encodeURI(URL_API + url), data, headersWithAuth).then(responseBody),
    putWithAuth: (url, data) => Http.put(encodeURI(URL_API + url), data, headersWithAuth).then(responseBody),
    deleteWithAuth: (url, data) => Http.delete(encodeURI(URL_API + url), data, headersWithAuth).then(responseBody),

    postResetPwd: (url, data, headers) => Http.post(encodeURI(URL_API + url), data, headers).then(responseBody),

    getApiGouv: (url, data, headers) => Http.get(encodeURI(url), data, headers).then(responseBody),

    postWithFile: (url, data) => Http.sendRequest(encodeURI(URL_API + url), {
        method: "post",
        data: data,
        serializer: "multipart",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }).then(responseBody),

    putWithFile: (url, data) => Http.sendRequest(encodeURI(URL_API + url), {
        method: "put",
        data: data,
        serializer: "multipart",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    }).then(responseBody)
}
