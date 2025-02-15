import { Injectable } from '@angular/core';
import { BookingsService } from '../../../../../shared/api/bookings.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlBookingsRequestsService {

  constructor(
    private bookingsService: BookingsService
  ) { }

  getAll(): Observable<any> {
    return this.bookingsService.getAll();
  }
}
