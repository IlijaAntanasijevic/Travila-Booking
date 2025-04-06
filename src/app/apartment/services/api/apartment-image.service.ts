import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { apiPaths } from '../../../config/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApartmentImageService extends ApiService<any>{

  constructor(http: HttpClient) {
    super(apiPaths.apartment.image, http);
  }

  getImage(fileName: string): Observable<any>{
    return this.http.get(`${this.apiUrl + this.url}/${fileName}`, { responseType: 'blob' });
  }
}
