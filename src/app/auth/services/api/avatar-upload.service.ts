import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiPaths } from '../../../config/api';
import { catchError, Observable } from 'rxjs';

export interface IAvatarUploadResponse {
  fileName: string;
  originalFileName: string;
  imageType: number;
}

@Injectable({
  providedIn: 'root'
})
export class AvatarUploadService extends ApiService<IAvatarUploadResponse> {

  constructor(http: HttpClient) {
    super(apiPaths.images.api, http);
  }

  uploadAvatar(file: File): Observable<IAvatarUploadResponse[]> {
    let formData = new FormData();
    formData.append("request[0].file", file, file.name);
    formData.append("request[0].imageType", "0"); // UploadType = 0 for avatar

    return this.http.post<IAvatarUploadResponse[]>(this.apiUrl + this.url, formData, {
      headers: new HttpHeaders({}),
    }).pipe(
      catchError((error) => this.handleErrors(error))
    );
  }
}
