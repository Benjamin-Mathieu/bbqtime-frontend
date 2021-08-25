import qrcode from "qrcode";

const urlEvent = "http://localhost:3000/event/"

class QrCode {
    generate(id) {
        qrcode.toDataURL(urlEvent + id, function (err, url) {
            console.log(url)
        })
    }
}

export default new QrCode;