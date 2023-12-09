import React from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonMenuButton,
} from '@ionic/react';

const About: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonPage>
  );
};

export default About;
