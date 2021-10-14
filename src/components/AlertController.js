import { alertController } from "@ionic/vue";
import store from "../store/store";

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