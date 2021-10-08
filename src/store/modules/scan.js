import router from "../../router/index";
import popup from '../../components/ToastController';
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Camera } from '@capacitor/camera';

const modulScan = {
    actions: {
        scan({ dispatch }) {
            BarcodeScanner.prepare();

            // request permissions
            const requestPermissions = async () => {
                const permissions = await Camera.requestPermissions({ permissions: "camera" });
                if (permissions.camera == "denied" || permissions.camera == "prompt-with-rationale") {
                    const c = confirm(
                        `Si vous souhaitez scanner un qrcode: autoriser l'utilisation de votre appareil photo dans les paramètres de l'application.`
                    );
                    if (c) {
                        BarcodeScanner.openAppSettings();
                    } else {
                        popup.warning("Impossible d'effectuer un scan, autorisez l'accès dans les paramètres de l'application");
                    }
                }
            }
            // check permissions
            const checkPermissions = async () => {
                const status = await BarcodeScanner.checkPermission({ force: true });
                console.log("status =>", status);
                if (status.granted) startScan;

                if (status.denied) {
                    requestPermissions();
                }
            }
            checkPermissions();
            BarcodeScanner.hideBackground(); // make background of WebView transparent

            const startScan = BarcodeScanner.startScan()
                .then((res) => {
                    if (res.hasContent) {
                        dispatch("joinEvent", res.content);
                    }
                })
                .catch((err) => console.log(err)); // start scanning and wait for a result
        },

        saveQrcode({ state }) {
            const params = router.currentRoute.value.params.id;
            state.myEvents.forEach((event) => {
                if (event.id == params) {
                    Filesystem.appendFile({
                        path: `${event.name}-${event.id}.png`,
                        data: event.qrcode,
                        directory: Directory.Documents,
                    });
                }
            });
        }
    }
}
export default modulScan;