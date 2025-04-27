import { Pipe, PipeTransform } from '@angular/core';
import { config } from '../../config/global';

export enum ImageType {
  Avatar = 0,
  Apartment = 1,
  ApartmentMain = 2,
}

@Pipe({
  name: 'imageUrl'
})

export class ImageUrlPipe implements PipeTransform {

  transform(imageName: string, type: ImageType): string {
    
    switch (type) {
      case ImageType.Avatar:
        return `${config.avatarImagesPath}${imageName}`;

      case ImageType.ApartmentMain:
        return `${config.apartmentMainImagePath}${imageName}`;

      case ImageType.Apartment:
        return `${config.apartmentImagesPath}${imageName}`;
        
      // default:
      //   return `${config.imagesPath}${imageName}`;
    }
  }

}
