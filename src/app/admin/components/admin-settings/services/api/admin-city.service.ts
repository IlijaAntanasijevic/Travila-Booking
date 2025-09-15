import { Injectable } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';
import { ICity } from '../../interfaces/i-settings';
import { HttpClient } from '@angular/common/http';
import { apiPaths } from '../../../../../config/api';

@Injectable({
  providedIn: 'root'
})
export class AdminCityService extends ApiService<ICity> {

  constructor(http: HttpClient) {
    super(apiPaths.admin.cities, http)
  }
}
