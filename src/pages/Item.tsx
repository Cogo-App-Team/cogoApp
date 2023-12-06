import React, { useState, useEffect } from 'react';
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
import { ref, uploadString, getDownloadURL } from '@firebase/storage';
import { collection, addDoc } from '@firebase/firestore';
import { storage, db } from '../firebase';

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
  
        // Ensure imageDataUrl is defined before proceeding
        if (imageDataUrl) {
          setPhotoData(imageDataUrl);
  
          // Upload photo to Firebase Storage
          const storageRef = ref(storage, 'photos/my_photo.jpg');
          await uploadString(storageRef, imageDataUrl, 'data_url');
        } else {
          console.error('Error: Image data URL is undefined.');
        }
      }
    } catch (error) {
      console.error('Error taking photo: ', error);
    }
  };

  const downloadPhoto = async () => {
    if (photoData) {
      // Download URL from Firebase Storage
      const downloadUrl = await getDownloadURL(ref(storage, 'photos/my_photo.jpg'));
      
      // Trigger download (open in a new tab)
      window.open(downloadUrl, '_blank');
    }
  };

  // Example: Save photo URL to Firestore
  useEffect(() => {
    const savePhotoToFirestore = async () => {
      if (photoData) {
        const photosCollection = collection(db, 'photos');
        await addDoc(photosCollection, { imageUrl: photoData });
      }
    };

    savePhotoToFirestore();
  }, [photoData, db]);

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