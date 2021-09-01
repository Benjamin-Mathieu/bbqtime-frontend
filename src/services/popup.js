import { toastController } from "@ionic/vue";

const popups = {
    async showPopUp(message) {
        const toast = await toastController
            .create({
                message: message,
                duration: 2000,
                color: "success",
                header: "Succès"
            })
        return toast.present();
    },

    async error(message) {
        const toast = await toastController
            .create({
                message: message,
                duration: 2000,
                color: "danger",
                header: "Problème",
                position: "middle"
            })
        return toast.present();
    }
}


export default popups