import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApartmentViewMode } from '../../enums/view-mode-enum';
import { IPaginatedResponse } from '../../../../core/interfaces/i-base';
import { IApartment, IApartmentSearch } from '../../../interfaces/i-apartment';
import { ISearchHomeRequest } from '../../../../home/components/home-seach/interfaces/i-search-home';

@Injectable({
  providedIn: 'root'
})
export class BlApartmentDashboardDataService {

  constructor() { }
  
  public viewMode: BehaviorSubject<ApartmentViewMode> = new BehaviorSubject<ApartmentViewMode>(ApartmentViewMode.LIST);

  public pageChanged: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  public totalApartments: BehaviorSubject<number> = new BehaviorSubject<number>(null);

  public filter: BehaviorSubject<IApartmentSearch> = new BehaviorSubject<IApartmentSearch>(null); 

  public searchedData: BehaviorSubject<ISearchHomeRequest> = new BehaviorSubject<ISearchHomeRequest>(null);

  public isApartmentBooked: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

}
