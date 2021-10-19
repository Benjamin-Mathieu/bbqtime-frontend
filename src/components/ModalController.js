import { modalController } from "@ionic/vue";
import FormCategorie from "../components/Forms/FormCategorie.vue";
import FormUpdateCategorie from "../components/Forms/FormUpdateCategorie.vue";
import FormUpdatePlat from "../components/Forms/FormUpdatePlat.vue";
import FormMenu from "../components/Forms/FormMenu.vue";
import FormAddAssociate from "../components/Forms/FormAddAssociate.vue";

const showModal = {
    async addCategorie() {
        const modal = await modalController.create({
            component: FormCategorie,
        });
        return modal.present();
    },

    async updateCategorie(id, libelle) {
        const modal = await modalController.create({
            component: FormUpdateCategorie,
            componentProps: { id, libelle },
        });
        return modal.present();
    },

    async addPlat() {
        const modal = await modalController.create({
            component: FormMenu,
        });
        return modal.present();
    },

    async updatePlat(plat) {
        const modal = await modalController.create({
            component: FormUpdatePlat,
            componentProps: { plat },
        });
        return modal.present();
    },

    async addAssociate() {
        const modal = await modalController.create({
            component: FormAddAssociate,
        });
        return modal.present();
    }
}

export default showModal;