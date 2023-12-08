import React, { useState } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonMenuButton,
} from '@ionic/react';

const Gallery: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const imageUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target) {
            const imageData = e.target.result as string;
            imageUrls.push(imageData);
            if (imageUrls.length === files.length) {
              setSelectedImages([...selectedImages, ...imageUrls]);
            }
          }
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };
 
  const fileInputRef = React.createRef<HTMLInputElement>();

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <IonHeader>
        <IonToolbar>
        <IonMenuButton slot="start" />
          <IonTitle>Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
      <div className="image-grid">
        {selectedImages.map((imageUrl, index) => (
          <div key={index} className="image-square">
            <img src={imageUrl} alt={`Image ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};


export default Gallery;
