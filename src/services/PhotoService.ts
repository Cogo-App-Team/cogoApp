import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';


interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

class PhotoService {
  getGalleryPhotos() {
      throw new Error('Method not implemented.');
  }
  public async takeAndSavePhoto() {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });
  
      const savedImage = await this.saveToGallery(image);
  
      return savedImage;
    } catch (error) {
      console.error('Error taking photo: ', error);
      return null;
    }
  }
  

  private async saveToGallery(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);
    
    if (base64Data === null) {
      console.error('Error converting photo to base64');
      return null; // Handle the error gracefully in your app
    }
  
    const fileName = `${new Date().getTime()}.jpeg`;
  
    try {
      // Convert base64Data to a Blob
      const blob = new Blob([base64Data], { type: 'image/jpeg' });
  
      await Filesystem.writeFile({
        path: fileName,
        data: blob, // Use the Blob data here
        directory: Directory.Data, // Use Directory.Data or another suitable directory
      });
  
      return fileName;
    } catch (error) {
      console.error('Error saving photo to gallery: ', error);
      return null;
    }
  }
  

  private async readAsBase64(photo: Photo) {
    if (!photo.webPath) {
      console.error('Photo webPath is undefined');
      return null;
    }
  
    const response = await fetch(photo.webPath);
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    const base64Data = btoa(new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));
  
    return `data:image/jpeg;base64,${base64Data}`;
  }
  

  private convertBlobToBase64(blob: Blob) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        if (reader.result && typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject('Error converting Blob to string');
        }
      };
      reader.readAsDataURL(blob);
    });
  }
}

const photoService = new PhotoService();
export default photoService;
