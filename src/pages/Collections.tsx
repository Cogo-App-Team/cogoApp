import React, { useState } from 'react';
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
import { addOutline, createOutline, arrowForwardOutline } from 'ionicons/icons';

const Collections: React.FC = () => {
  const history = useHistory<any>(); 
  const [showModal, setShowModal] = useState(false);
  const [collectionName, setCollectionName] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');
  const [tags, setTags] = useState('');
  const [collections, setCollections] = useState<string[]>(['Coins', 'Stamps', 'Swords']);
  const [showToast, setShowToast] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addCollection = () => {
    if (collectionName.trim() !== '') {
      setCollections([...collections, collectionName]);
      setShowModal(false);
      setCollectionName('');
      setCollectionDescription('');
      setTags('');
    } else {
      console.error('Collection name is required.');
      setShowToast(true);
    }
  };

  const editCollection = (index: number) => {
    setEditingIndex(index);
    setCollectionName(collections[index]);
    setShowModal(true);
  };

  const navigateToEditCollection = () => {
    const editedCollection = collections[editingIndex!];
    history.push(`/item/${encodeURIComponent(editedCollection)}`);
  };

  const handleCollectionClick = (index: number) => {
    if (editingIndex !== null) {
      navigateToEditCollection();
    }
  };

  const navigateToItemsPage = () => {
    history.push('/items');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle>Collections</IonTitle>
          <IonButton slot="end" onClick={() => setShowModal(true)} className="button-new button-new-add">
      <IonIcon icon={addOutline} />
      Add
    </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent className="background-new">

               {/* Grid and "Items" Button */}

      <IonGrid>
          <IonRow>
            <IonCol>
              
            </IonCol>
            <IonCol>
              
            </IonCol>
            <IonCol>
             
               {/* "Items" Button */}
               <IonButton onClick={navigateToItemsPage} className="button-new button-new-items">
  Items
  <IonIcon icon={arrowForwardOutline} slot="end" />
</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>


        <IonGrid>
          <IonRow>
            {collections.map((collection, index) => (
              <IonCol key={index} size="4" onClick={() => handleCollectionClick(index)}>
                <IonCard className="card-new">

                  <IonCardContent>
                    <IonLabel>{collection}</IonLabel>
                    <IonIcon icon={createOutline} onClick={() => editCollection(index)} className="button-new" />
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>

      {/* Add/Edit Modal */}
      <IonModal isOpen={showModal}>
      <IonHeader>
    <IonToolbar>
      <IonTitle>Add Collection</IonTitle>
    </IonToolbar>
  </IonHeader>
        <IonContent>
          <IonLabel className="button-new">Collection Name</IonLabel>
          <IonInput
            value={collectionName}
            onIonChange={(e) => setCollectionName(e.detail.value!)}
            className="custom-input"
          ></IonInput>

          <IonLabel className="button-new">Collection Description</IonLabel>
          <IonInput
            value={collectionDescription}
            onIonChange={(e) => setCollectionDescription(e.detail.value!)}
            className="custom-input"
          ></IonInput>

          <IonLabel className="button-new">Tags</IonLabel>
          <IonInput
            value={tags}
            onIonChange={(e) => setTags(e.detail.value!)}
            className="custom-input"
          ></IonInput>

          <IonButton onClick={() => setShowModal(false)} className="button-new button-new-cancel">
            Cancel
          </IonButton>
          <IonButton onClick={addCollection} className="button-new">
            Save
          </IonButton>
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

export default Collections;

