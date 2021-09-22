import popup from '../services/popup';

const httpErrorHandler = (err) => {
    if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        popup.error(err.response.data.message)
    }
}

export default httpErrorHandler;