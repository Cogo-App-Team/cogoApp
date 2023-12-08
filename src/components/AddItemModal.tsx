import React, { useState } from 'react';
import {
  IonModal,
  IonContent,
  IonInput,
  IonLabel,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonIcon,
} from '@ionic/react';
import { addOutline, camera } from 'ionicons/icons';

interface AddItemModalProps {
  showModal: boolean;
  onClose: () => void;
  onAddItem: (itemName: string, itemDescription: string, tags: string, selectedCollection: string) => void;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ showModal, onClose, onAddItem }) => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [tags, setTags] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<string>('');

  const addItem = () => {
    if (itemName.trim() !== '') {
      onAddItem(itemName, itemDescription, tags, selectedCollection);
      onClose();
    } else {
      console.error('Item name is required.');
      // Handle error or show a toast
    }
  };

  const takePhoto = () => {
    // Implement photo-taking logic if needed
  };

  return (
    <IonModal isOpen={showModal}>
      <IonContent>
        <IonLabel>Item Name</IonLabel>
        <IonInput value={itemName} onIonChange={(e) => setItemName(e.detail.value!)}></IonInput>

        <IonLabel>Item Description</IonLabel>
        <IonInput
          value={itemDescription}
          onIonChange={(e) => setItemDescription(e.detail.value!)}
        ></IonInput>

        <IonLabel>Tags</IonLabel>
        <IonInput value={tags} onIonChange={(e) => setTags(e.detail.value!)}></IonInput>

        <IonButton onClick={takePhoto}>
          <IonIcon icon={camera} />
          Take Photo
        </IonButton>

        <IonLabel>Add to Collection</IonLabel>
        <IonSelect
          value={selectedCollection}
          placeholder="Select Collection"
          onIonChange={(e) => setSelectedCollection(e.detail.value)}
        >
          <IonSelectOption value="Coins">Coins</IonSelectOption>
          <IonSelectOption value="Stamps">Stamps</IonSelectOption>
          <IonSelectOption value="Swords">Swords</IonSelectOption>
        </IonSelect>

        <IonButton onClick={addItem}>Save</IonButton>
        <IonButton onClick={onClose}>Cancel</IonButton>
      </IonContent>
    </IonModal>
  );
};

export default AddItemModal;
