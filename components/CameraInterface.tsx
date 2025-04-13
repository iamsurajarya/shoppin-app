// components/CameraInterface.tsx
import React, { useState, useRef } from "react";
import { Camera, CameraResultType } from "@capacitor/camera";
import { Button } from "./ui/button";

interface CameraInterfaceProps {
  onPhotoTaken?: (photo: string) => void;
}

const CameraInterface: React.FC<CameraInterfaceProps> = ({ onPhotoTaken }) => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const cameraRef = useRef<HTMLDivElement>(null);

  // Initialize camera
  const initializeCamera = async () => {
    try {
      const permission = await Camera.checkPermissions();

      if (!permission.camera) {
        const { camera } = await Camera.requestPermissions();
        if (!camera) throw new Error("Camera permissions denied");
      }

      setIsCameraActive(true);
    } catch (error) {
      console.error("Camera initialization failed:", error);
    }
  };

  // Handle photo capture
  const takePicture = async () => {
    try {
      const result = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
      });

      if (onPhotoTaken) {
        onPhotoTaken(result.webPath || "");
      }
    } catch (error) {
      console.error("Failed to capture photo:", error);
    }
  };

  // Handle gallery selection
  const selectFromGallery = async () => {
    try {
      const result = await Camera.pickImages({
        quality: 90,
        limit: 1,
      });

      if (result.photos?.[0]) {
        if (onPhotoTaken) {
          onPhotoTaken(result.photos[0].webPath || "");
        }
      }
    } catch (error) {
      console.error("Failed to select from gallery:", error);
    }
  };

  return (
    <div className="camera-container">
      {!isCameraActive ? (
        <Button className="camera-icon-button" onClick={initializeCamera}>
          📸 Suraj
        </Button>
      ) : (
        <>
          <div ref={cameraRef} className="camera-preview">
            {/* Camera preview will be rendered here */}
            <div className="focus-border" />
          </div>

          <div className="controls">
            <button className="gallery-button" onClick={selectFromGallery}>
              🖼️
            </button>

            <button className="lens-button" onClick={takePicture}>
              🔍
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CameraInterface;
