import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonModal,
  IonInput,
  IonLabel,
  IonToast,
  IonMenuButton,
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';

const CollectionsPage: React.FC = () => {

  const history = useHistory<any>(); 
  const [showModal, setShowModal] = useState(false);
  const [collectionName, setCollectionName] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');
  const [tags, setTags] = useState('');
  const [collections, setCollections] = useState<string[]>(['Coins', 'Stamps', 'Swords']);
  const [showToast, setShowToast] = useState(false);

  const addCollection = () => {
    if (collectionName.trim() !== '') {
      setCollections([...collections, collectionName]);
      setShowModal(false);
      // You can add further logic to save other details like description and tags.
      setCollectionName('');
      setCollectionDescription('');
      setTags('');
    } else {
      // Handle error when collection name is not filled.
      console.error('Collection name is required.');
      setShowToast(true);
    }
  };

  const navigateToItemsPage = () => {
    // Use the useHistory hook to navigate to the "Items" page
    history.push('/item'); // Replace '/items' with the correct path to your "Items" page
  };
  
  const handleCollectionClick = (collection: string) => {
    if (collection === 'Swords') {
      navigateToItemsPage();
    } else {
      history.push(`/item/${collection}`); 
    }
  };
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonMenuButton slot="start" />
          <IonTitle>Collections</IonTitle>
          <IonButton slot="end" onClick={() => setShowModal(true)}>
            <IonIcon icon={addOutline} />
            Add
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            {collections.map((collection, index) => (
              <IonCol key={index} size="4" onClick={() => handleCollectionClick(collection)}>
                <IonCard>
                  <IonCardContent>
                    <IonLabel>{collection}</IonLabel>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>

      {/* Add Modal */}
      <IonModal isOpen={showModal}>
        <IonContent>
          <IonLabel>Collection Name</IonLabel>
          <IonInput value={collectionName} onIonChange={(e) => setCollectionName(e.detail.value!)}></IonInput>

          <IonLabel>Collection Description</IonLabel>
          <IonInput
            value={collectionDescription}
            onIonChange={(e) => setCollectionDescription(e.detail.value!)}
          ></IonInput>

          <IonLabel>Tags</IonLabel>
          <IonInput value={tags} onIonChange={(e) => setTags(e.detail.value!)}></IonInput>

          <IonButton onClick={() => setShowModal(false)}>Cancel</IonButton>
          <IonButton onClick={addCollection}>Save</IonButton>
        </IonContent>
      </IonModal>

      {/* Error Toast */}
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Collection name is required."
        duration={2000}
        color="danger"
        position="top"
      />
    </IonPage>
  );
};

export default CollectionsPage;
