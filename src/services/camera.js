import { Camera, CameraResultType } from '@capacitor/camera';

class GetPicture {
    async browser() {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Uri,
            promptLabelPhoto: "Depuis la gallerie",
            promptLabelPicture: "Prendre une photo"
        });
        console.log(image);
        // image.webPath will contain a path that can be set as an image src.
        // You can access the original file using image.path, which can be
        // passed to the Filesystem API to read the raw data of the image,
        // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
        // var imageUrl = image.webPath;

        // Can be set to the src of an image now
        // imageElement.src = imageUrl;
    };
}

export default new GetPicture;