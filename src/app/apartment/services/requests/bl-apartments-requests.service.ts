import { Injectable } from '@angular/core';
import { ApartmentService } from '../api/apartment.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlApartmentsRequestsService {

  constructor(
    private apartmentService: ApartmentService
  ) { }


  getAll(): Observable<any> {
    return this.apartmentService.getAll();
  }

}
