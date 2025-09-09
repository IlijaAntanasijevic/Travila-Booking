import { Injectable } from '@angular/core';
import { AdminApartmentsService } from '../api/admin-apartments.service';
import { AdminApartmentFiltersService } from '../api/admin-apartment-filters.service';
import { IAdminApartmentFiltersData, IAdminApartments, IAdminFiltersRequest } from '../interfaces/i-admin-apartments';
import { Observable } from 'rxjs';
import { ApartmentService } from '../../../../../apartment/services/api/apartment.service';

@Injectable({
  providedIn: 'root'
})
export class BlAdminApartmentsRequestsService {

  constructor(
    private apiService: AdminApartmentsService,
    private filterService: AdminApartmentFiltersService,
    private apartmentService: ApartmentService
  ) { }

  getAllApartments(search: IAdminFiltersRequest): Observable<IAdminApartments[]> {
    return this.apiService.getAllByQueryParams(search);
  }

  getAllFilters(): Observable<IAdminApartmentFiltersData> {
    return this.filterService.getAllObject();
  }

  getApartmentDetails(id: number): Observable<any> {
    return this.apartmentService.getOne(id)
  }
}
