import { UrlMatchResult, UrlSegment } from "@angular/router";
import { config } from "../../config/global";
import { ImageType } from "../../shared/helpers/image-url.pipe";

export class ImageUtils {
  static getImagePath(imageName: string, type: ImageType): string {

  switch (type) {
    case ImageType.Avatar:
      return `${config.avatarImagesPath}${imageName}`;
    
    case ImageType.ApartmentMain:
      return `${config.apartmentMainImagePath}${imageName}`;
    
    case ImageType.Apartment:
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