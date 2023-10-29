import React from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonButtons,
  IonMenuButton, // Add this import
} from '@ionic/react';
import { camera, images, settings, person } from 'ionicons/icons';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonMenuButton slot="start" />
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
    {/*   <IonContent>
        <div className="ion-text-center">
          <IonButton routerLink="/photo">
            <IonIcon icon={camera} />
            <br />
            Take a Photo
          </IonButton>
        </div>
        <div className="ion-text-center">
        <IonButton routerLink="/photo/gallery">
          <IonIcon icon={images} />
            <br />
            Gallery
        </IonButton>
        </div>
        <div className="ion-text-center">
          <IonButton routerLink="/settings">
            <IonIcon icon={settings} />
            <br />
            Settings
          </IonButton>
        </div>
        <div className="ion-text-center">
          <IonButton routerLink="/profile">
            <IonIcon icon={person} />
            <br />
            Profile
          </IonButton>
        </div>
      </IonContent> */}
    </IonPage>
  );
};

export default Home;
