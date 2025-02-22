import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { IBase } from '../../../core/interfaces/i-base';
import { HttpClient } from '@angular/common/http';
import { apiPaths } from '../../../config/api';
import { Observable } from 'rxjs';
import { config } from '../../../config/global';

@Injectable({
  providedIn: 'root'
})
export class CityService extends ApiService<IBase> {

  constructor(http: HttpClient) {
    super(apiPaths.lookup.cities, http)
  }

  getAllByCountryId(id: number): Observable<IBase[]> {
    return this.http.get<IBase[]>(config.apiUrl + apiPaths.lookup.cities + "/country/" + id);
  }
}
