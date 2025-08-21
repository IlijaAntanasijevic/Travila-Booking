import { UrlMatchResult, UrlSegment } from "@angular/router";
import { config } from "../../config/global";
import { IMAGE_TYPE } from "../../shared/helpers/image-url.pipe";

export class ImageUtils {
  static getImagePath(imageName: string, type: IMAGE_TYPE): string {

  switch (type) {
    case IMAGE_TYPE.Avatar:
      return `${config.avatarImagesPath}${imageName}`;
    
    case IMAGE_TYPE.ApartmentMain:
      return `${config.apartmentMainImagePath}${imageName}`;
    
    case IMAGE_TYPE.Apartment:
      return `${config.apartmentImagesPath}${imageName}`;

    default:
      return null;
    }
   
  }
}

export function numberIdMatcher(segments: UrlSegment[]): UrlMatchResult | null {
  if (segments.length === 1 && /^\d+$/.test(segments[0].path)) {
    return {
      consumed: segments,
      posParams: {
        id: new UrlSegment(segments[0].path, {})
      }
    };
  }
  return null;
}

export function toUTCDateString(date: Date): string{
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString();
}