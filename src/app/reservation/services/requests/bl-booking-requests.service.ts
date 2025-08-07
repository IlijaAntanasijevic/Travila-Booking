import { Injectable } from '@angular/core';
import { BlApartmentsRequestsService } from '../../../apartment/services/requests/bl-apartments-requests.service';
import { Observable } from 'rxjs';
import { IApartmentDetail } from '../../../apartment/interfaces/i-apartment';
import { BookingService } from '../api/booking.service';

@Injectable({
  providedIn: 'root'
})
export class BlBookingRequestsService {

  constructor(
   private apiService: BookingService,
   private apartmentService: BlApartmentsRequestsService,
  ) { }

  getApartmentById(id: number): Observable<IApartmentDetail> {
    return this.apartmentService.getOne(id);
  }

}
