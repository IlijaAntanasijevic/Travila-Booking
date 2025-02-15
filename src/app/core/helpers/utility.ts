import { UrlMatchResult, UrlSegment } from "@angular/router";
import { config } from "../../config/global";
import { ImagePaths } from "../consts/image-paths";

export class ImageUtils {
  static getImagePath(imagePath: string, basePath: ImagePaths): string {
    let tmp = imagePath.split("\\");
    let imageName = tmp[tmp.length - 1];

    return `${config.apiUrl}${basePath}/${imageName}`;
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