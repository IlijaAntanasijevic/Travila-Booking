import { Injectable } from '@angular/core';
import { FavoriteApartmentsService } from '../api/favorite-apartments.service';
import { map, Observable } from 'rxjs';
import { IPaginatedResponse } from '../../../../../core/interfaces/i-base';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlFavoriteApartmentsRequestsService {

  constructor(
    private apiService: FavoriteApartmentsService,
    private http: HttpClient
  ) { }


  getFavoriteApartments(page: number = 1, perPage: number = 9): Observable<any> {
    let queryParams = `page=${page}&perPage=${perPage}`;
    return this.apiService.getAllByQueryParams(queryParams);
  }

  addToFavorite(apartmentId: number): Observable<any> {
    return this.apiService.update(apartmentId, null);
  }

  removeFromFavorite(apartmentId: number): Observable<any> {
    return this.apiService.delete(apartmentId);
  }
}
