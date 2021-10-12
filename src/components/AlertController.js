import { alertController } from "@ionic/vue";
import store from "../store/store";

const showAlert = {
    async validDelete(id) {
        const alert = await alertController.create({
            subHeader: "Etes-vous sûr de supprimer cette catégorie ?",
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
            await store.dispatch("deleteCategorie", id);
            store.dispatch("getCategories");
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