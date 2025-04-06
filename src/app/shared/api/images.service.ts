import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiPaths } from '../../config/api';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService extends ApiService<any>{

  constructor(http: HttpClient) {
    super(apiPaths.images.api, http);
  }

  override create(files: File[]): Observable<any> {
    let formData = new FormData();
    for(let file of files) {
      formData.append("files", file, file.name)
    }

    return this.http.post<any>(this.apiUrl + this.url, formData, {
      headers: new HttpHeaders({}),
    }).pipe(
      catchError((error) => this.handleErrors(error))
    );
  }
}
