import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import './Home.css';
import ItemCollection from '../components/ItemCollection'; // Import your ItemCollection component

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cogo</IonTitle> {/* Update the app title to 'Cogo' */}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Cogo</IonTitle> {/* Update the app title when collapsed */}
          </IonToolbar>
        </IonHeader>

        {/* Display the ItemCollection component for collecting items */}
        <ItemCollection />

        {/* Add login and register buttons */}
        <IonButton expand="full" routerLink="/login">Login</IonButton>
        <IonButton expand="full" routerLink="/register">Register</IonButton>
        <IonButton expand="full" routerLink="/items">View Collected Items</IonButton> {/* Add a button to navigate to a page displaying collected items */}
      </IonContent>
    </IonPage>
  );
};

export default Home;
