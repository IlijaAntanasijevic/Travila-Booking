import { Injectable } from '@angular/core';
import { CityService } from '../../../../../shared/api/lookup/city.service';
import { Observable } from 'rxjs';
import { IBase } from '../../../../../core/interfaces/i-base';
import { ISearchHomeRequest } from '../../interfaces/i-search-home';
import { HomeSearchService } from '../api/home-search.service';

@Injectable({
  providedIn: 'root'
})
export class BlHomeSearchRequestsService {

  constructor(
    private homeSearchService: HomeSearchService,
    private cityService: CityService
  ) { }

  getAllCities(): Observable<IBase[]> {
    return this.cityService.getAll();
  }

  search(data: ISearchHomeRequest): Observable<any> {
    return this.homeSearchService.getAllByQueryParams(data);
  }
}
