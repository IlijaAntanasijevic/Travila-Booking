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


  test(): Observable<IPaginatedResponse<any>> {
    return this.http.get("http://localhost:5000/api/apartment?Sorts[0].SortProperty=MostPopular&PerPage=6&Page=" + 1).pipe(
      map((response: any) => ({
        ...response
      }) as IPaginatedResponse<any>)
    );
  }

  addToFavorite(apartmentId: number): Observable<any> {
    let obj = {
      id: apartmentId
    }
    return this.apiService.create(obj);
  }

  removeFromFavorite(apartmentId: number): Observable<any> {
    return this.apiService.delete(apartmentId);
  }
}
