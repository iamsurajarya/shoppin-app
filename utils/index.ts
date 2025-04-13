// cameraHandler
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

export const openCameraOrGallery = async (source: "camera" | "gallery") => {
  const result = await Camera.getPhoto({
    resultType: CameraResultType.Base64,
    source: source === "camera" ? CameraSource.Camera : CameraSource.Photos,
    quality: 90,
  });
  return result.base64String;
};
