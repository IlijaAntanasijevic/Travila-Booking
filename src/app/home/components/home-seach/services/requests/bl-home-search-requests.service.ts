import { Injectable } from '@angular/core';
import { CityService } from '../../../../../shared/api/city.service';
import { Observable } from 'rxjs';
import { IBase } from '../../../../../core/interfaces/i-base';

@Injectable({
  providedIn: 'root'
})
export class BlHomeSearchRequestsService {

  constructor(
    private cityService: CityService
  ) { }

  getAllCities(): Observable<IBase[]> {
    return this.cityService.getAll();
  }
}
