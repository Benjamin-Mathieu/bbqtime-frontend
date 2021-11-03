import { alertController } from "@ionic/vue";
import store from "../store/store";
import axios from "axios";
import httpErrorHandler from '../store/httpErrorHandler';
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
                await store.dispatch("deleteCategorie", id);
                store.dispatch("getCategories");
            }
            if (type === "plat") {
                await store.dispatch("deletePlat", id);
                store.dispatch("getCategories");
            }
            if (type === "platInShop") {
                store.commit("removePlatInShop", id);
            }
            if (type === "event") {
                await axios({
                    method: "delete",
                    url: URL_API + 'events/delete',
                    data: {
                        id: id
                    },
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    }
                })
                    .then(res => {
                        popup.success(res.data.message);
                        store.dispatch("getMyEvents");
                    })
                    .catch(httpErrorHandler)
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