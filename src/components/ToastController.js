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
                position: "middle",
                color: "warning",
                header: "Attention",
                buttons: [
                    {
                        icon: 'close',
                        role: 'cancel'
                    }
                ]
            })
        return toast.present();
    },

    async error(message) {
        const toast = await toastController
            .create({
                duration: 3000,
                message: message,
                header: "Erreur",
            })
        return toast.present();
    }
}


export default popups