import { Pipe, PipeTransform } from '@angular/core';
import { config } from '../../config/global';

export enum IMAGE_TYPE {
  Avatar = 0,
  Apartment = 1,
  ApartmentMain = 2,
}

@Pipe({
    name: 'imageUrl',
    standalone: false
})

export class ImageUrlPipe implements PipeTransform {

  transform(imageName: string, type: IMAGE_TYPE): string {
    
    switch (type) {
      case IMAGE_TYPE.Avatar:
        return `${config.avatarImagesPath}${imageName}`;

      case IMAGE_TYPE.ApartmentMain:
        return `${config.apartmentMainImagePath}${imageName}`;

      case IMAGE_TYPE.Apartment:
        return `${config.apartmentImagesPath}${imageName}`;
        
      // default:
      //   return `${config.imagesPath}${imageName}`;
    }
  }

}
