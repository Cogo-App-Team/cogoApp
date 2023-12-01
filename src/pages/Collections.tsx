import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonMenuButton, IonLabel, IonButton, IonIcon, IonModal, IonInput } from '@ionic/react';
import { add } from 'ionicons/icons';
import { addDoc, collection, onSnapshot, query, orderBy, Timestamp } from 'firebase/firestore';
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
  const [selectedItem, setSelectedItem] = useState({ name: '', description: '', tags: '' });
  const [newCollection, setNewCollection] = useState({ name: '', description: '', tags: '' });
  const [items, setItems] = useState<MyCollection[]>([]);

    // Set up a reference to the 'userCollections' collection in Firestore
    const userCollectionsRef = collection(db, 'userCollections');
  
    useEffect(() => {
      // Set up a listener for changes in the 'userCollections' collection
      const unsubscribe = onSnapshot(query(userCollectionsRef, orderBy('name')), (snapshot) => {
        const collectionsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as MyCollection[];

        setItems(collectionsData);
      });
  
  
      // Clean up the listener when the component unmounts
      return () => unsubscribe();
    }, [userCollectionsRef]);

    const openModal = (item: React.SetStateAction<{ name: string; description: string; tags: string; }>) => {
      setSelectedItem(item);
      setShowModal(true);
    };
  
    const closeModal = () => {
      setShowModal(false);
    };
  
    const openAddCollectionModal = () => {
      setShowAddCollectionModal(true);
    };
  
    const closeAddCollectionModal = () => {
      setShowAddCollectionModal(false);
    };
  
    const saveNewCollection = async () => {
      try {
        // Validate that the collection name is provided and not empty
        if (newCollection.name.trim() === '') {
          // Display an error message for an empty name
          console.error('Error: Collection Name is required.');
          alert('Error: Collection Name is required.'); // Display an alert for user visibility
          return; // Exit the function if validation fails
        }
  
        // Check if the collection name is already taken
        const isDuplicateName = items.some((item) => item.name === newCollection.name);
        if (isDuplicateName) {
          // Display an error message for a duplicate name
          console.error('Error: Collection Name already exists.');
          alert('Error: Collection Name already exists.'); // Display an alert for user visibility
          return; // Exit the function if validation fails
        }  
  
        // Create a new collection and add it to Firestore
        const docRef = await addDoc(userCollectionsRef, {
          ...newCollection,
          imageUrl: 'url-to-default-image.jpg',
          timestamp: Timestamp.now(),
        });
  
        // Create a new item and add it to the items list
        const newItem = { id: docRef.id, ...newCollection, imageUrl: 'url-to-default-image.jpg' };
        setItems([...items, newItem]);
  
        // Close the modal and reset the newCollection state
        setNewCollection({ name: '', description: '', tags: '' });
        closeAddCollectionModal();
      } catch (error) {
        console.error('Error adding collection to Firestore: ', error);
      }
    };
  

  return (
    <IonPage>
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
            <IonCol>
            </IonCol>
            <IonCol className="ion-text-center ion-align-items-center">
            <IonButton shape="round" onClick={openAddCollectionModal}><IonIcon slot="start" icon={add}></IonIcon>Add</IonButton>
            </IonCol>
          </IonRow> 

          <IonRow>
            {items.map((item) => (
              <IonCol key={item.id} size="4">
                <IonCard onClick={() => openModal(item)}>
                  <img src={item.imageUrl} alt={item.name} />
                  <div>{item.name}</div>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        {/* Modal for Item Details */}
        <IonModal isOpen={showModal}>
          {/* ... (previous modal code) */}
        </IonModal>

        {/* Modal for Adding a Collection */}
        <IonModal isOpen={showAddCollectionModal}>
          <IonContent>
            <IonInput
              placeholder="Collection Name"
              value={newCollection.name}
              onIonChange={(e) => setNewCollection({ ...newCollection, name: e.detail.value! })}
            />
            <IonInput
              placeholder="Collection Description"
              value={newCollection.description}
              onIonChange={(e) => setNewCollection({ ...newCollection, description: e.detail.value! })}
            />
            <IonInput
              placeholder="Tags"
              value={newCollection.tags}
              onIonChange={(e) => setNewCollection({ ...newCollection, tags: e.detail.value! })}
            />
          </IonContent>
          <IonButton onClick={closeAddCollectionModal} slot="end">Cancel</IonButton>
          <IonButton onClick={saveNewCollection} slot="end">Save</IonButton>
        </IonModal>
        
      </IonContent>
    </IonPage>  

  );
};

export default Collections;