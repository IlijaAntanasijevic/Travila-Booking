import { Injectable } from '@angular/core';
import { IApartmentReview } from '../../interfaces/i-apartment-review';
import { ApiService } from '../../../../../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { apiPaths } from '../../../../../../config/api';

@Injectable({
  providedIn: 'root'
})
export class ApartmentReviewService extends ApiService<IApartmentReview> {

  constructor(
    http: HttpClient
  ) {
    super(apiPaths.apartment.rating, http)
  }
}
