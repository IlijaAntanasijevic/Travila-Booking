import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminBookingsService } from '../api/admin-bookings.service';
import { IAdminBooking, IAdminBookingFilters } from '../interfaces/i-admin-bookings';
import { AdminApartmentFiltersService } from '../../../admin-apartments/services/api/admin-apartment-filters.service';

@Injectable({
  providedIn: 'root'
})
export class BlAdminBookingsRequestsService {

  constructor(
    private apiService: AdminBookingsService,
    private adminApartmentFilters: AdminApartmentFiltersService
  ) {}

  getAll(query: any): Observable<IAdminBooking[]> {
    return this.apiService.getAllByQueryParams(query);
  }

  getFilters(): Observable<any> {
    return this.adminApartmentFilters.getAll();
  }
}


