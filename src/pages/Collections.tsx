import React, { useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardContent, IonGrid, IonRow, IonCol,
  IonMenuButton, IonLabel, IonButton, IonIcon, IonModal, IonInput
} from '@ionic/react';
import { add } from 'ionicons/icons';
import {
  addDoc, collection, onSnapshot, query, orderBy, Timestamp
} from 'firebase/firestore';
import { db } from '../firebase';

interface MyCollection {
  id: string;
  name: string;
  description: string;
  tags: string;
  imageUrl: string;
}

const Collections: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showAddCollectionModal, setShowAddCollectionModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MyCollection>({ id: '', name: '', description: '', tags: '', imageUrl: '' });
  const [newCollection, setNewCollection] = useState<{ name: string; description: string; tags: string }>({ name: '', description: '', tags: '' });
  const [items, setItems] = useState<MyCollection[]>([]);
  const userCollectionsRef = collection(db, 'userCollections');

  useEffect(() => {
    const unsubscribe = onSnapshot(query(userCollectionsRef, orderBy('name')), (snapshot) => {
      const collectionsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as MyCollection));
      setItems(collectionsData);
    });

    return () => unsubscribe();
  }, [userCollectionsRef]);

  const openModal = (item: MyCollection) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const openAddCollectionModal = () => setShowAddCollectionModal(true);

  const closeAddCollectionModal = () => {
    setShowAddCollectionModal(false);
    setNewCollection({ name: '', description: '', tags: '' });
  };

  const saveNewCollection = async () => {
    try {
      // ... (unchanged)

      const docRef = await addDoc(userCollectionsRef, {
        ...newCollection,
        imageUrl: 'url-to-default-image.jpg',
        timestamp: Timestamp.now(),
      });

      const newItem = { id: docRef.id, ...newCollection, imageUrl: 'url-to-default-image.jpg' };
      setItems([...items, newItem]);

      closeAddCollectionModal();
    } catch (error) {
      console.error('Error adding collection to Firestore: ', error);
    }
  };

  return (
    <IonPage>
      <div className="custom-app"></div>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol className="ion-text-center">
              <h4>My Collections</h4>
            </IonCol>
            <IonCol />
            <IonCol className="ion-text-center ion-align-items-center">
              <IonButton shape="round" onClick={openAddCollectionModal}>
                <IonIcon slot="start" icon={add} />
                Add
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            {items.map((item) => (
              <IonCol key={item.id} size="4">
                <IonCard onClick={() => openModal(item)}>
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} />
                  ) : (
                    <div>Missing Image</div>
                  )}
                  <div>{item.name}</div>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <IonModal isOpen={showModal}>
          {/* ... (previous modal code) */}
        </IonModal>
        <IonModal isOpen={showAddCollectionModal}>
          <IonContent>
            {/* ... (unchanged) */}
          </IonContent>
          <IonButton onClick={closeAddCollectionModal} slot="end">
            Cancel
          </IonButton>
          <IonButton onClick={saveNewCollection} slot="end">
            Save
          </IonButton>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Collections;