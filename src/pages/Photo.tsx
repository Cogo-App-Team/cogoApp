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
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonMenuButton slot="start" />
          <IonTitle>Photo Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {photoData ? (
          <img src={photoData} alt="Taken" />
        ) : (
          <div className="ion-text-center">
            <IonButton expand="full" onClick={takePhoto}>
              <IonIcon icon={camera} />
              <br />
              Add to your collection
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
