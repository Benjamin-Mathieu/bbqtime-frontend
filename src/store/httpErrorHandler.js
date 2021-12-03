import popup from '../components/ToastController';

const httpErrorHandler = (err) => {
    if (err.response) {
        popup.error(err.response.data.message)
    }
}

export default httpErrorHandler;