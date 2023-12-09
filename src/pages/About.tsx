

import React from 'react';
import { IonContent, IonPage, IonText, IonMenuButton } from '@ionic/react';
import './About.css'; 
import { Link } from 'react-router-dom'; 

const About: React.FC = () => {
  return (
    <IonPage>
      <IonMenuButton slot="start" />
      <IonContent className="ion-padding center-content">
        <div className="text-container">
          <IonText className="line" color="black" style={{ fontSize: '2em', fontWeight: 'bold' }}>
            About Cogo
          </IonText>

          <IonText className="line description-text">
            Have you ever been in a situation where you could acquire a rare item for your collection,
          </IonText>
          <IonText className="line description-text">
            BUT your collection has grown so large that you don’t even know if you already have it?!​
          </IonText>
          <IonText className="line description-text">
            We sure have.
          </IonText>
          <IonText className="line description-text">
            Avoid this head-scratcher moment with Cogo app​ – the app to organize your valuables!
          </IonText>
          <IonText className="line description-text">
            Keep track of all your items and collections!​
          </IonText>
          <IonText className="line description-text">
            Easy to add new items and browse existing collections​
          </IonText>
          <IonText className="line description-text">
            Connect with other like-minded aficionados!​
          </IonText>
          <IonText className="line description-text">
            Suitable for various collectibles​
          </IonText>
          <IonText className="line description-text">
            Coins​
          </IonText>
          <IonText className="line description-text">
            Movies​
          </IonText>
          <IonText className="line description-text">
            Books​
          </IonText>
          <IonText className="line description-text">
            Stamps​
          </IonText>
          <IonText className="line description-text">
            Whatever it is you collect!
          </IonText>
          <IonText className="line contact-link">
            Got more questions?
            </IonText>
            <IonText>
            <Link to="/contact">Contact Us</Link>
          </IonText>
        </div>
      </IonContent>
    </IonPage>
  );
};


export default About;
