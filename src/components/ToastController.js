import { toastController } from "@ionic/vue";

const popups = {
    async success(message) {
        const toast = await toastController
            .create({
                message: message,
                duration: 3000,
                color: "success",
                header: "Succès"
            })
        return toast.present();
    },

    async warning(message) {
        const toast = await toastController
            .create({
                message: message,
                duration: 3000,
                color: "warning",
                header: "Attention"
            })
        return toast.present();
    },

    async error(message) {
        const toast = await toastController
            .create({
                message: message,
                header: "Erreur",
                buttons: [
                    {
                        icon: 'close',
                        role: 'cancel'
                    }
                ]
            })
        return toast.present();
    }
}


export default popups