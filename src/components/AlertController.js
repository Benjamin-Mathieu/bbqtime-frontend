import { alertController } from "@ionic/vue";
import store from "../store/store";
import { request } from "../store/httpRequest";
import popup from './ToastController';

const URL_API = "http://192.168.1.47:3000/";

const showAlert = {
    async validDelete(id, message, type) {
        const alert = await alertController.create({
            subHeader: message,
            buttons: [
                {
                    text: "Non",
                    role: "cancel",
                },
                {
                    text: "Oui",
                    role: "valid",
                },
            ],
        });
        await alert.present();

        const { role } = await alert.onDidDismiss();
        if (role === "valid") {
            if (type === "categorie") {
                request.deleteWithAuth(URL_API + `categories/delete/${id}`)
                    .then(resp => {
                        popup.success(resp.message);
                        store.dispatch("getCategories");
                    })
                    .catch(err => {
                        console.error(err);
                        err.error = JSON.parse(err.error);
                        popup.warning(err.error.message);
                    });
            }
            if (type === "plat") {
                request.deleteWithAuth(URL_API + `plats/delete/${id}`)
                    .then(resp => {
                        popup.success(resp.message);
                        store.dispatch("getCategories");
                    })
                    .catch(err => {
                        console.error(err);
                        err.error = JSON.parse(err.error);
                        popup.warning(err.error.message);
                    });
            }
            if (type === "platInShop") {
                store.commit("removePlatInShop", id);
            }
            if (type === "event") {
                request.deleteWithAuth(URL_API + `events/delete/${id}`)
                    .then(resp => {
                        popup.success(resp.message);
                        store.dispatch("getMyEvents");
                    })
                    .catch(err => {
                        console.error(err);
                        err.error = JSON.parse(err.error);
                        popup.warning(err.error.message);
                    });
            }
            if (type === "associate") {
                store.dispatch("deleteAssociate", id);
            }
        }
    },

    async validEvent() {
        const alert = await alertController.create({
            subHeader: "Avez-vous terminé ?",
            buttons: [
                {
                    text: "Retour",
                    role: "cancel",
                },
                {
                    text: "Valider",
                    role: "valid",
                },
            ],
        });
        await alert.present();

        const { role } = await alert.onDidDismiss();
        if (role === "valid") {
            store.state.events.currentStep = 3;
        }
    },

    async validClearShop() {
        const alert = await alertController.create({
            subHeader: "Votre panier contient des plats qui ne font pas partie du même évènement, voulez-vous vider votre panier ?",
            buttons: [
                {
                    text: "Non",
                    role: "cancel"
                },
                {
                    text: "Oui",
                    role: "valid"
                },
            ],
        });
        await alert.present();

        const { role } = await alert.onDidDismiss();
        if (role === "valid") {
            store.commit("clearShop");
        }
    }
}

export default showAlert;