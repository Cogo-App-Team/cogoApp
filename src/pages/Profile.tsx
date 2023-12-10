
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
} from '@ionic/react';
import './Profile.css'; 
import { Link } from 'react-router-dom'; 


const ProfilePage: React.FC = () => {
  
  const [bio, setBio] = useState<string>('');
  const [isLocked, setIsLocked] = useState<boolean>(true);

  const toggleLock = () => {
    setIsLocked(!isLocked);
  };

  return (
    <IonPage className="profile-page-container">
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonButtons slot="start">
            <IonButton>
            </IonButton>
          </IonButtons>
          <IonTitle></IonTitle>
          <IonButtons slot="end">
            <IonButton>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-text-center profile-page">
        <IonCard className="custom-card">
          <IonGrid>
            <IonRow>
              <IonCol size="6" className="ion-text-center">
                <IonAvatar>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/456/456283.png"
                    alt="Profile"
                    className="profile-image"
                  />
                </IonAvatar>
              </IonCol>
              <IonCol size="6" className="ion-text-end">
               
                <img
                  src="https://cdn-icons-png.flaticon.com/128/84/84380.png"
                  alt="Second Image"
                  className="second-image"
                />
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
                <IonCard>
                  <IonCardContent>
                    <IonGrid>
                      <IonRow>
                        <IonCol className="profile-stat-container">
                          <IonLabel className="profile-stat">0</IonLabel>
                          <IonLabel className="profile-label">Collection</IonLabel>
                        </IonCol>
                        <IonCol className="profile-stat-container">
                          <IonLabel className="profile-stat">0</IonLabel>
                          <IonLabel className="profile-label">Followers</IonLabel>
                        </IonCol>
                        <IonCol className="profile-stat-container">
                          <IonLabel className="profile-stat">0</IonLabel>
                          <IonLabel className="profile-label">Following</IonLabel>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12">
                <IonCard onClick={() => setBio('')}>
                  <IonCardContent>
                    <IonInput
                      className="profile-input"
                      placeholder="Write your biography"
                      value={bio}
                      onIonChange={(e) => setBio(e.detail.value!)}
                    />
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12" className="ion-text-center">
                
              </IonCol>
            </IonRow>

            <IonRow>
              <IonCol size="12" className="ion-text-center">
               
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
