import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApartmentViewMode } from '../../enums/view-mode-enum';
import { IPaginatedResponse } from '../../../../core/interfaces/i-base';
import { IApartment } from '../../../interfaces/i-apartment';

@Injectable({
  providedIn: 'root'
})
export class BlApartmentDashboardDataService {

  constructor() { }
  
  public viewMode: BehaviorSubject<ApartmentViewMode> = new BehaviorSubject<ApartmentViewMode>(ApartmentViewMode.LIST);

  public apartmentsData: BehaviorSubject<IPaginatedResponse<IApartment>> = new BehaviorSubject<IPaginatedResponse<IApartment>>(null);
}
