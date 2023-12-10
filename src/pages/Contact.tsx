import React from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonMenuButton,
} from '@ionic/react';

const Contact: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle>Contact</IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonPage>
  );
};

export default Contact;
