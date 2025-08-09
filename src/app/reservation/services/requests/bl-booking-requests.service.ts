import { Injectable } from '@angular/core';
import { BlApartmentsRequestsService } from '../../../apartment/services/requests/bl-apartments-requests.service';
import { Observable } from 'rxjs';
import { IApartmentDetail } from '../../../apartment/interfaces/i-apartment';
import { BookingService } from '../api/booking.service';
import { IApartmentBooking } from '../../interfaces/i-apartment-booking';
import { UserService } from '../../../user/services/api/user.service';
import { AuthService } from '../../../auth/services/shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BlBookingRequestsService {

  constructor(
   private apiService: BookingService,
   private apartmentService: BlApartmentsRequestsService,
   private userService: UserService,
   private authService: AuthService
  ) { }

  getApartmentById(id: number): Observable<IApartmentDetail> {
    return this.apartmentService.getOne(id);
  }

  createBooking(bookingData: IApartmentBooking): Observable<any> {
    return this.apiService.create(bookingData);
  }

  getUserData(): Observable<any> {
    let id = this.authService.getUserId();
    return this.userService.getOne(id);
  }

}
