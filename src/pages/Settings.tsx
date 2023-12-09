import React from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonButtons,
  IonMenuButton,
} from '@ionic/react';

const Settings: React.FC = () => {
  return (
    <div className="custom-app settings-page-wrapper">
    <IonPage>
     <IonHeader>
  <IonToolbar>
    <IonButtons slot="start">
      <IonMenuButton />
    </IonButtons>
    <IonTitle>Settings</IonTitle>
  </IonToolbar>
</IonHeader>
      <IonContent>
        <IonList>
          <IonItem className="settings-custom-item">
            <IonLabel>Enable SMS notifications</IonLabel>
            <IonToggle className="custom-toggle" />
          </IonItem>
          <IonItem className="settings-custom-item">
            <IonLabel>Favorite collections’ notifications</IonLabel>
            <IonToggle className="custom-toggle" />
          </IonItem>
          <IonItem className="settings-custom-item">
            <IonLabel>Enable email notifications</IonLabel>
            <IonToggle className="custom-toggle" />
          </IonItem>
          <IonItem className="settings-custom-item">
            <IonLabel>Enable lock screen notifications</IonLabel>
            <IonToggle className="custom-toggle" />
          </IonItem>
          <IonItem className="settings-custom-item">
            <IonLabel>Enable marketing emails</IonLabel>
            <IonToggle className="custom-toggle" />
          </IonItem>
          <IonItem className="settings-custom-item">
            <IonLabel>Private account</IonLabel>
            <IonToggle className="custom-toggle" />
          </IonItem>
          <IonItem className="settings-custom-item">
            <IonLabel>Private collections</IonLabel>
            <IonToggle className="custom-toggle" />
          </IonItem>
          <IonItem className="settings-custom-item">
            <IonLabel>Allow followers</IonLabel>
            <IonToggle className="custom-toggle" />
          </IonItem>
          <IonItem className="settings-custom-item">
            <IonLabel>Enable notifications in my collections</IonLabel>
            <IonToggle className="custom-toggle" />
          </IonItem>
          <IonItem className="settings-custom-item">
            <IonLabel>Enable location tracking</IonLabel>
            <IonToggle className="custom-toggle" />
          </IonItem>
          <IonItem className="settings-custom-item">
            <IonLabel>Enable offline mode</IonLabel>
            <IonToggle className="custom-toggle" />
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
    </div>
  );
};

export default Settings;
