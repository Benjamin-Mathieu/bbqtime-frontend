import { alertController } from "@ionic/vue";
import store from "../store/store";
import axios from "axios";
import httpErrorHandler from '../store/httpErrorHandler';
import popup from './ToastController';
import router from "../router/index";

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
                store.dispatch("getPlats");
            }
            if (type === "platInShop") {
                await store.commit("removePlatInShop", id);
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
                        router.push({ name: "MyEvents" });
                    })
                    .catch(httpErrorHandler)
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
    }
}

export default showAlert;