import React from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonAvatar,
  IonLabel,
  IonMenuButton,
} from '@ionic/react';

const Profile: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonMenuButton slot="start" />
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonAvatar>
          <img src="user-profile-image.jpg" alt="User Profile" />
        </IonAvatar>
        <IonLabel>User Name</IonLabel>
        {/* Display more profile information */}
      </IonContent>
    </IonPage>
  );
};

export default Profile;
