import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiPaths } from '../../config/api';
import { catchError, Observable } from 'rxjs';
import { IApartmentUploadImage } from '../../apartment/user-apartment/interfaces/i-add-edit-apartment';

@Injectable({
  providedIn: 'root'
})
export class ImagesService extends ApiService<any>{

  constructor(http: HttpClient) {
    super(apiPaths.images.api, http);
  }

  override create(request: IApartmentUploadImage[]): Observable<any> {
    let formData = new FormData();
    // for(let file of files) {
    //   formData.append("file", file, file.name)
    //   formData.append("imageType", '1');
    // }

    request.forEach((item, index) => {
      formData.append(`request[${index}].file`, item.file, item.file.name);
      formData.append(`request[${index}].imageType`, item.imageType.toString());
    });

    return this.http.post<any>(this.apiUrl + this.url, formData, {
      headers: new HttpHeaders({}),
    }).pipe(
      catchError((error) => this.handleErrors(error))
    );
  }
}
