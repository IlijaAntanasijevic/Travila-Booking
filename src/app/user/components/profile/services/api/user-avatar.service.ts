import { Injectable } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiPaths } from '../../../../../config/api';
import { catchError, Observable } from 'rxjs';
import { config } from '../../../../../config/global';

@Injectable({
  providedIn: 'root'
})
export class UserAvatarService extends ApiService<any> {

  constructor(http: HttpClient) {
    super(apiPaths.user.avatar, http)
  }

  override update(id: number, file: File): Observable<any> {

    let formData = new FormData();
    formData.append("file", file, file.name)

    let url = config.apiUrl + apiPaths.user.avatar;
    return this.http.put<any>(url, formData, {
      headers: new HttpHeaders({}),
    }).pipe(
      catchError((error) => this.handleErrors(error))
    );
  }
}
