import React, { useState, useEffect } from 'react';
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
  IonItem,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { addOutline, camera, arrowForwardOutline, arrowBackOutline } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

const Items: React.FC = () => {
  const history = useHistory<any>(); 

  const [selectedCollection, setSelectedCollection] = useState<string>('');

  const [showModal, setShowModal] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [tags, setTags] = useState('');
  const [items, setItems] = useState<string[]>(['Knife', 'Dagger', 'Sword']);
  const [showToast, setShowToast] = useState(false);
  const [photoData, setPhotoData] = useState<string | undefined>(undefined);

  const addItem = () => {
    if (itemName.trim() !== '') {
      setItems([...items, itemName]);
      setShowModal(false);
      setItemName('');
      setItemDescription('');
      setTags('');
    } else {
      console.error('Item name is required.');
      setShowToast(true);
    }
  };

    const takePhoto = async () => {
      try {
        const image = await Camera.getPhoto({
          resultType: CameraResultType.DataUrl,
          source: CameraSource.Camera,
        });
    
        if (image) {
          const imageDataUrl = image.dataUrl;
          setPhotoData(imageDataUrl);
        }
      } catch (error) {
        console.error('Error taking photo: ', error);
      }
  };

  const navigateToCollectionsPage = () => {
    // Use the history object to navigate to the Collections page
    history.push('/collections'); // Replace '/collections' with the actual path of your Collections page
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle>Items</IonTitle>
          


          <IonButton slot="end" onClick={() => setShowModal(true)} className="button-new button-new-add">
            <IonIcon icon={addOutline} />
            Add
          </IonButton>



        </IonToolbar>
      </IonHeader>

      <IonContent class="background-new">

      <IonGrid>
          <IonRow>
            <IonCol>
              
            </IonCol>
            <IonCol>
              
            </IonCol>
            <IonCol>
             
          
          <IonButton onClick={navigateToCollectionsPage} className="button-new button-new-items">
  <IonIcon icon={arrowBackOutline} />
   Back to Collections
</IonButton>

            </IonCol>
          </IonRow>
        </IonGrid>

        <IonGrid>
          <IonRow>
            
            {items.map((item, index) => (
              <IonCol key={index} size="4">
                <IonCard className="card-new">

                  <IonCardContent>
                    <IonLabel>{item}</IonLabel>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>

      {/* Add Modal */}
     
      <IonModal isOpen={showModal}>
  <IonHeader>
    <IonToolbar>
      <IonTitle>Add Item</IonTitle>
    </IonToolbar>
  </IonHeader>
  
  <IonContent>

    {/* Take Photo Button */}
    <IonButton onClick={takePhoto} className="button-new">
      <IonIcon icon={camera} />
      Take Photo
    </IonButton>

    {/* Display Taken Photo */}
    {photoData && <img src={photoData} alt="Taken" />}
    
    <br></br>

    {/* Your Item details input fields go here */}
    <IonLabel className="button-new">Item Name</IonLabel>
    <IonInput value={itemName} onIonChange={(e) => setItemName(e.detail.value!)}></IonInput>

          <IonLabel className="button-new">Item Description</IonLabel>
          <IonInput
            value={itemDescription}
            onIonChange={(e) => setItemDescription(e.detail.value!)}
          ></IonInput>

          <IonLabel className="button-new">Tags</IonLabel>
          <IonInput value={tags} onIonChange={(e) => setTags(e.detail.value!)}></IonInput>

          <IonItem className="dropdown">
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
  </IonItem>

  </IonContent>

  <IonButton onClick={() => setShowModal(false)} className="button-new button-new-cancel">Cancel</IonButton>
   <IonButton onClick={addItem} className="button-new">Save</IonButton>
</IonModal>

      {/* Error Toast */}
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Item name is required."
        duration={2000}
        color="danger"
        position="top"
      />
    </IonPage>
  );
};

export default Items;
