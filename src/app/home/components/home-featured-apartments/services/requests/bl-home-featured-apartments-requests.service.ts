import { Injectable } from '@angular/core';
import { ApartmentService } from '../../../../../apartment/services/api/apartment.service';
import { map, Observable } from 'rxjs';
import { IApartment } from '../../../../../apartment/interfaces/i-apartment';
import { IPaginatedResponse } from '../../../../../core/interfaces/i-base';

@Injectable({
  providedIn: 'root'
})
export class BlHomeFeaturedApartmentsRequestsService {

  constructor(
    private apartmentService: ApartmentService
  ) { }

  getFeatured(page: number = 1): Observable<IPaginatedResponse<IApartment>> {
    return this.apartmentService.getAllByQueryParams("Sorts[0].SortProperty=popular&PerPage=6&Page=" + page).pipe(
      map((response: any) => ({
        ...response
      }) as IPaginatedResponse<IApartment>)
    );
  }
}
