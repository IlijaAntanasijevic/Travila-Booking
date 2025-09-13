import { Injectable } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { apiPaths } from '../../../../../config/api';
import { Observable } from 'rxjs';
import { IAdminBooking, IAdminBookingFilters } from '../interfaces/i-admin-bookings';
import { config } from '../../../../../config/global';

@Injectable({
  providedIn: 'root'
})
export class AdminBookingsService extends ApiService<IAdminBooking> {

  constructor(http: HttpClient) {
    super(apiPaths.admin.bookings, http);
  }

  getFilters(): Observable<IAdminBookingFilters> {
    return this.http.get<IAdminBookingFilters>(config.apiUrl + apiPaths.admin.bookings + '/filters');
  }
}


