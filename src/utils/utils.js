import { Geolocation } from '@capacitor/geolocation';
import popups from "../components/ToastController";


/** 
* @returns {Array} with coordinates lat, lon
*/

export const printCurrentPosition = async () => {
    const status = await Geolocation.checkPermissions();
    if (status.location === "granted") {
        const coordinates = await Geolocation.getCurrentPosition();
        return coordinates;
    } else {
        requestPermissions();
    }
};

const requestPermissions = async () => {
    const permissions = await Geolocation.requestPermissions({ permissions: 'coarseLocation' });

    if (permissions.location == "denied" || permissions.location == "prompt-with-rationale") {
        popups.warning("Vous devez autorisé la géolocalisation dans les paramètres de l'application !");
    }
}

/**
* @param {Datetime} dateToConvert
* @returns {String} Date : 28/10/1994
*/

export const convertDate = async (dateToConvert) => {
    const date = new Date(dateToConvert);
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();
    const h = date.getUTCHours();
    let min = date.getMinutes();
    if (min < 10) min = "0" + min;

    const converted_date = `${d}/${m}/${y} à ${h}:${min}`
    return converted_date;
}