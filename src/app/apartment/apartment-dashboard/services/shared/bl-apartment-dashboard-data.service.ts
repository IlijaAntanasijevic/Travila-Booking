import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { APARTMENT_VIEW_MODE } from '../../enums/view-mode-enum';
import { IPaginatedResponse } from '../../../../core/interfaces/i-base';
import { IApartment, IApartmentSearch } from '../../../interfaces/i-apartment';
import { ISearchHomeRequest } from '../../../../home/components/home-seach/interfaces/i-search-home';

@Injectable({
  providedIn: 'root'
})
export class BlApartmentDashboardDataService {

  constructor() { }
  
  public viewMode: BehaviorSubject<APARTMENT_VIEW_MODE> = new BehaviorSubject<APARTMENT_VIEW_MODE>(APARTMENT_VIEW_MODE.LIST);

  public pageChanged: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  public totalApartments: BehaviorSubject<number> = new BehaviorSubject<number>(null);

  public filter: BehaviorSubject<IApartmentSearch> = new BehaviorSubject<IApartmentSearch>(null); 

  public searchedData: BehaviorSubject<ISearchHomeRequest> = new BehaviorSubject<ISearchHomeRequest>(null);

  public isApartmentBooked: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isApartmentAvailable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public viewApartmentFromHome: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

}
