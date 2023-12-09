

import React from 'react';
import { IonContent, IonPage, IonText, IonButton, IonButtons, IonMenuButton } from '@ionic/react';
import './Contact.css'; 

const Contact: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding center-content orange-background">
        <IonButtons>
          <IonMenuButton slot="start" />
        </IonButtons>

        <div className="text-container">
          <IonText color="black" style={{ fontSize: '2em', fontWeight: 'bold' }}>
            Have a question? Contact Us!
          </IonText>
          <br />
          
          <IonText className="secondary-text">
          
            We appreciate your questions and feedback. Here are some ways to contact us.
          </IonText>
        </div>

        <div className="button-container">
          <IonButton expand="full" color="primary">
            Contact customer support
          </IonButton>

          <IonButton expand="full" color="primary">
            Call us
          </IonButton>

          <IonButton expand="full" color="primary">
            Send us an e-mail
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Contact;
