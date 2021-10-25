import { modalController } from "@ionic/vue";
import ModalCategorie from "./ModalCategorie.vue";
import ModalUpdateCategorie from "./ModalUpdateCategorie.vue";
import ModalUpdatePlat from "./ModalUpdatePlat.vue";
import ModalPlat from "./ModalPlat.vue";
import ModalAddAssociate from "./ModalAddAssociate.vue";
import ModalQrCode from "./ModalQrCode";
import ModalInvitationEvent from "./ModalInvitationEvent";

const showModal = {
    async addCategorie() {
        const modal = await modalController.create({
            component: ModalCategorie,
        });
        return modal.present();
    },

    async updateCategorie(id, libelle) {
        const modal = await modalController.create({
            component: ModalUpdateCategorie,
            componentProps: { id, libelle },
        });
        return modal.present();
    },

    async addPlat() {
        const modal = await modalController.create({
            component: ModalPlat,
        });
        return modal.present();
    },

    async updatePlat(plat) {
        const modal = await modalController.create({
            component: ModalUpdatePlat,
            componentProps: { plat },
        });
        return modal.present();
    },

    async addAssociate() {
        const modal = await modalController.create({
            component: ModalAddAssociate,
        });
        return modal.present();
    },

    async qrCode() {
        const modal = await modalController.create({
            component: ModalQrCode,
        });
        return modal.present();
    },

    async invitationEvent() {
        const modal = await modalController.create({
            component: ModalInvitationEvent,
        });
        return modal.present();
    }
}

export default showModal;