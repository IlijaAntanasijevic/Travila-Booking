import { Injectable } from '@angular/core';
import { ApartmentService } from '../../../../../apartment/services/api/apartment.service';
import { map, Observable } from 'rxjs';
import { IApartment } from '../../../../../apartment/interfaces/i-apartment';
import { IPaginatedResponse } from '../../../../../core/interfaces/i-base';
import { BlFavoriteApartmentsRequestsService } from '../../../../../user/components/favorite-apartments/services/requests/bl-favorite-apartments-requests.service';

@Injectable({
  providedIn: 'root'
})
export class BlHomeFeaturedApartmentsRequestsService {

  constructor(
    private apartmentService: ApartmentService,
    private favoriteApartmentsRequestService: BlFavoriteApartmentsRequestsService,
  ) { }

  getFeatured(page: number = 1): Observable<IPaginatedResponse<IApartment>> {
    return this.apartmentService.getAllByQueryParams("sorts[0].Direction=Desc&Sorts[0].SortProperty=MostPopular&PerPage=6&Page=" + page).pipe(
      map((response: any) => ({
        ...response
      }) as IPaginatedResponse<IApartment>)
    );
  }

  addToFavorite(apartmentId: number): Observable<any> {
    return this.favoriteApartmentsRequestService.addToFavorite(apartmentId);
  }
}
