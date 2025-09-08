import { Injectable } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';
import { IAdminApartments } from '../interfaces/i-admin-apartments';
import { HttpClient } from '@angular/common/http';
import { apiPaths } from '../../../../../config/api';

@Injectable({
  providedIn: 'root'
})
export class AdminApartmentsService extends ApiService<IAdminApartments> {

  constructor(http: HttpClient) { 
    super(apiPaths.admin.apartments, http);
  }
}
