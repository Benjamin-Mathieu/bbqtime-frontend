import qrcode from "qrcode";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";

const urlEvent = "http://localhost:3000/event/"

class QrCode {
    generate(id) {
        qrcode.toDataURL(urlEvent + id, function (err, url) {
            console.log(url)
        })
    }

    scan() {
        // check or request permission
        BarcodeScanner.checkPermission({ force: true })
            .then((res) => console.log(res, "Permissions ok"))
            .catch((err) => console.log(err));

        BarcodeScanner.hideBackground(); // make background of WebView transparent

        const result = BarcodeScanner.startScan()
            .then((res) => {
                console.log(res);
                // if the result has content
                if (result.hasContent) {
                    console.log(result.content); // log the raw scanned content
                }
            })
            .catch((err) => console.log(err)); // start scanning and wait for a result
    }
}

export default new QrCode;