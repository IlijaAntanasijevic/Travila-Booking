import { Injectable } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { apiPaths } from '../../../../config/api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService extends ApiService<any>{

  constructor(http: HttpClient) {
    super(apiPaths.apartment.archive, http)
   }
}
