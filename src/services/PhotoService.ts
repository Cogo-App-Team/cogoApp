import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

class PhotoService {
  getGalleryPhotos() {
      throw new Error('Method not implemented.');
  }
  public async takeAndSavePhoto(): Promise<UserPhoto | null> {
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

  private async saveToGallery(photo: Photo): Promise<UserPhoto | null> {
    const base64Data = await this.readAsBase64(photo);

    if (base64Data === null) {
      console.error('Error converting photo to base64');
      return null;
    }

    const fileName = `${new Date().getTime()}.jpeg`;

    try {
      const blob = new Blob([base64Data], { type: 'image/jpeg' });

      await Filesystem.writeFile({
        path: fileName,
        data: blob,
        directory: Directory.Data,
      });

      return { filepath: fileName, webviewPath: photo.webPath };
    } catch (error) {
      console.error('Error saving photo to gallery: ', error);
      return null;
    }
  }

  private async readAsBase64(photo: Photo): Promise<string | null> {
    if (!photo.webPath) {
      console.error('Photo webPath is undefined');
      return null;
    }

    const response = await fetch(photo.webPath);
    const blob = await response.blob();
    const buffer = await blob.arrayBuffer();
    const base64Data = btoa(
      new Uint8Array(buffer).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );

    return `data:image/jpeg;base64,${base64Data}`;
  }
}

const photoService = new PhotoService();
export default photoService;
