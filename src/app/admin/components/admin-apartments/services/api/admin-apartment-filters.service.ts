import { Injectable } from '@angular/core';
import { IAdminApartmentFiltersData } from '../interfaces/i-admin-apartments';
import { ApiService } from '../../../../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { apiPaths } from '../../../../../config/api';

@Injectable({
  providedIn: 'root'
})
export class AdminApartmentFiltersService extends ApiService<IAdminApartmentFiltersData> {

  constructor(http: HttpClient) {
    super(apiPaths.admin.apartmentFilters, http)
   }
}
