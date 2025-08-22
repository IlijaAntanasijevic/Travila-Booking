import { Injectable } from '@angular/core';
import { ApartmentReviewService } from '../api/apartment-review.service';
import { IApartmentReviewRequest } from '../../interfaces/i-apartment-review';
import { Observable } from 'rxjs';
import { IDefaultPagination } from '../../../../../../core/interfaces/i-base';

@Injectable({
  providedIn: 'root'
})
export class BlApartmentReviewRequestsService {

  constructor(
    private apiService: ApartmentReviewService
  ) { }


  addRating(data: IApartmentReviewRequest): Observable<any> {
    return this.apiService.create(data);
  }

  getRatings(pagination: IDefaultPagination, id: number): Observable<any> {
    return this.apiService.getAllByQueryParams(`perPage=${pagination.perPage}&page=${pagination.page}&id=${id}`);
  }
}
