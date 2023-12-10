import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonMenuButton,
  IonTitle,
  IonAvatar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonInput,
  IonIcon,
} from '@ionic/react';
import './Profile.css';
import { personCircleOutline, createOutline } from 'ionicons/icons';

const ProfilePage: React.FC = () => {
  const [bio, setBio] = useState<string>('');
  const [isLocked, setIsLocked] = useState<boolean>(true);

  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

  return (
    <IonPage className="profile-page">
      <IonHeader className="profile-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle className="top-header-title">Profile</IonTitle>
          {!isLocked && (
            <IonButtons slot="end">
              <IonButton color="secondary">
                <IonIcon name="create-outline" />
              </IonButton>
            </IonButtons>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-text-center profile-page">
        <IonCard className="custom-card">
          <IonGrid>
            <IonRow>
              <IonCol size="6" className="ion-text-center">
                <IonAvatar>
                <IonIcon icon={personCircleOutline} className="profile-image" />
                </IonAvatar>
              </IonCol>
              <IonCol size="6" className="ion-text-end">
              <IonIcon icon={createOutline} className="second-image" />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12" className="ion-text-center">
                <IonLabel className="profile-label">Your Name</IonLabel>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="12" className="ion-text-center">
                <IonLabel className="profile-label">Account Settings</IonLabel>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12">
              <IonButton
  expand="full"
  color="custom-edit-bio"
  className="bio-button"
  onClick={toggleLock}
>
  {isLocked ? 'Edit Bio' : 'Save Bio'}
</IonButton>


              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12">
                <IonCard>
                  <IonCardContent>
                    {isLocked ? (
                      <IonLabel className="profile-label">{bio}</IonLabel>
                    ) : (
                      <IonInput
                        className="profile-input"
                        placeholder="Write your biography"
                        value={bio}
                        onIonChange={(e) => setBio(e.detail.value!)}
                      />
                    )}
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;