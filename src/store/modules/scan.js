import popup from '../../components/ToastController';
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
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
    }
}
export default modulScan;