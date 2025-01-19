import { Injectable } from '@angular/core';
import { ApartmentReviewService } from '../api/apartment-review.service';
import { IApartmentReviewRequest } from '../../interfaces/i-apartment-review';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlApartmentReviewRequestsService {

  constructor(
    private apiService: ApartmentReviewService
  ) { }


  addReview(data: IApartmentReviewRequest): Observable<any> {
    return this.apiService.create(data);
  }
}
