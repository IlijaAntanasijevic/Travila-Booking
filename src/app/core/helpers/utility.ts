import { config } from "../../config/global";
import { ImagePaths } from "../consts/image-paths";

export class ImageUtils {
  static getImagePath(imagePath: string, basePath: ImagePaths): string {
    let tmp = imagePath.split("\\");
    let imageName = tmp[tmp.length - 1];
   
    return `${config.apiUrl}${basePath}/${imageName}`;
  }
}