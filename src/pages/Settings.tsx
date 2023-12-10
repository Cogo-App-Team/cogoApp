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
        <IonList className="custom-list">
          <IonItem className="settings-custom-item">
            <IonToggle className="custom-toggle">Enable SMS notifications</IonToggle>
          </IonItem>
          <IonItem className="settings-custom-item">
          <IonToggle className="custom-toggle">Favorite collections’ notifications</IonToggle>
          </IonItem>
          <IonItem className="settings-custom-item">
          <IonToggle className="custom-toggle">Enable email notifications</IonToggle>
          </IonItem>
          <IonItem className="settings-custom-item">
          <IonToggle className="custom-toggle">Enable lock screen notifications</IonToggle>
          </IonItem>
          <IonItem className="settings-custom-item">
          <IonToggle className="custom-toggle">Enable marketing emails</IonToggle>
          </IonItem>
          <IonItem className="settings-custom-item">
          <IonToggle className="custom-toggle">Private account</IonToggle>
          </IonItem>
          <IonItem className="settings-custom-item">
          <IonToggle className="custom-toggle">Private collections</IonToggle>
          </IonItem>
          <IonItem className="settings-custom-item">
          <IonToggle className="custom-toggle">Allow followers</IonToggle>
          </IonItem>
          <IonItem className="settings-custom-item">
          <IonToggle className="custom-toggle">Enable notifications in my collections</IonToggle>
          </IonItem>
          <IonItem className="settings-custom-item">
          <IonToggle className="custom-toggle">Enable location tracking</IonToggle>
          </IonItem>
          <IonItem className="settings-custom-item">
          <IonToggle className="custom-toggle">Enable offline mode</IonToggle>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
    </div>
  );
};

export default Settings;
