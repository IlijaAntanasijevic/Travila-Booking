import { Injectable } from '@angular/core';
import { BookingsService } from '../../../../../shared/api/bookings.service';
import { Observable } from 'rxjs';
import { MyGuestBookingsService } from '../api/my-guest-bookings.service';

@Injectable({
  providedIn: 'root'
})
export class BlBookingsRequestsService {

  constructor(
    private bookingsService: BookingsService,
    private myGuestBookingsService: MyGuestBookingsService
  ) { }

  getAll(): Observable<any> {
    return this.bookingsService.getAll();
  }

  getMyGuests(): Observable<any> {
    return this.myGuestBookingsService.getAll();
  }
}
