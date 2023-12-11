import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonFooter,
  IonButtons,
  IonMenuButton,
} from '@ionic/react';
import { camera, cloudDownload } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

const Photo: React.FC = () => {
  const [photoData, setPhotoData] = useState<string | undefined>(undefined);

  const takePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      if (image) {
        const imageDataUrl = image.dataUrl;
        setPhotoData(imageDataUrl);
      }
    } catch (error) {
      console.error('Error taking photo: ', error);
    }
  };

  const downloadPhoto = () => {
    if (photoData) {
      const a = document.createElement('a');
      a.href = photoData;
      a.download = 'my_photo.jpg';
      a.click();
    }
  };

  return (
    <IonPage className="photo-page">
      <IonHeader className="photo-header">
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle>Create Item</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="centered-text">
          <p>Take a photo to add to your collection!</p>
        </div>
        {photoData ? (
          <img src={photoData} alt="Taken" />
        ) : (
          <div className="ion-text-center">
            <IonButton
              className="photo-custom-button"
              expand="full"
              onClick={takePhoto}
              color="YourColor" // Replace "YourColor" with your desired button color
            >
              <IonIcon icon={camera} className="icon-padding" />
              Take a photo
            </IonButton>
          </div>
        )}
      </IonContent>
      <IonFooter>
        {photoData && (
          <IonToolbar>
            <IonButtons slot="primary">
              <IonButton onClick={downloadPhoto}>
                <IonIcon icon={cloudDownload} />
                Download
              </IonButton>
            </IonButtons>
          </IonToolbar>
        )}
      </IonFooter>
    </IonPage>
  );
};

export default Photo;
