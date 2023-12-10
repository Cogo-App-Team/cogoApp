import React from 'react';
import {
  IonContent, IonPage, IonText, IonButton, IonHeader, IonToolbar, 
  IonTitle, IonButtons, IonMenuButton
} from '@ionic/react';

const Contact: React.FC = () => {
  return (
    <IonPage className="contact-page">
      <IonHeader className="contact-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="top-header-title">Contact Us</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding center-content contact-page">
        <div className="text-container">
          <IonText className="contact-title">
            Have a question? Contact Us!
          </IonText>
          <br />
          
          <IonText className="contact-text">
            We appreciate your questions and feedback. Here are some ways to contact us.
          </IonText>
        </div>

        <div className="button-container">
          <IonButton expand="full" className="custom-button">
            Contact customer support
          </IonButton>

          <IonButton expand="full" className="custom-button">
            Call us
          </IonButton>

          <IonButton expand="full" className="custom-button">
            Send us an e-mail
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Contact;
