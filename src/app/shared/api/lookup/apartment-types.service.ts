import { Injectable } from '@angular/core';
import { IBase } from '../../../core/interfaces/i-base';
import { ApiService } from '../../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { apiPaths } from '../../../config/api';

@Injectable({
  providedIn: 'root'
})
export class ApartmentTypesService extends ApiService<IBase> {

  constructor(http: HttpClient) {
    super(apiPaths.lookup.apartmentType, http)
  }
}
