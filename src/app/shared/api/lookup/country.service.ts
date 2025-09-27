import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiPaths } from '../../../config/api';
import { IBase } from '../../../core/interfaces/i-base';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { config } from '../../../config/global';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends ApiService<IBase> {

  constructor(http: HttpClient) {
    super(apiPaths.lookup.countries, http)
  }

  getAllAdminCountries(): Observable<IBase[]> {
    return this.http.get<IBase[]>(`${config.apiUrl}${apiPaths.lookup.countries}?isActive=false`);
  }
}
