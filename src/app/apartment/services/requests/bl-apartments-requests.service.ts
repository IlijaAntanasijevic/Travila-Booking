import { Injectable } from '@angular/core';
import { ApartmentService } from '../api/apartment.service';
import { Observable } from 'rxjs';
import { IApartmentSearch } from '../../interfaces/i-apartment';
import { toUTCDateString } from '../../../core/helpers/utility';

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

  getOne(id: number): Observable<any> {
    return this.apartmentService.getOne(id);
  }


  getAllByQueryParams(params: IApartmentSearch = null): Observable<any> {
    let paramsToSend: string | IApartmentSearch = this.prepareQuery(params);

    return this.apartmentService.getAllByQueryParams(paramsToSend);

  }

  private prepareQuery(params: IApartmentSearch): string {
    const queryParts: string[] = [];

    if (params.maxPrice !== null && params.maxPrice != undefined) {
      queryParts.push(`maxPrice=${params.maxPrice}`);
    }
    if (params.perPage !== null && params.perPage != undefined) {
      queryParts.push(`perPage=${params.perPage}`);
    }
    if (params.cityId !== null && params.cityId !== undefined) {
      queryParts.push(`cityId=${params.cityId}`);
    }
     if (params.checkIn !== null && params.checkIn !== undefined) {
      queryParts.push(`checkIn=${toUTCDateString(new Date(params.checkIn))}`); 
    }
     if (params.checkOut !== null && params.checkOut !== undefined) {
      queryParts.push(`checkOut=${toUTCDateString(new Date(params.checkOut))}`);
    }
    if (params.isMyApartment !== null && params.isMyApartment !== undefined) {
      queryParts.push(`isMyApartment=${params.isMyApartment}`);
    }
      if (params.isAvailable !== null && params.isAvailable !== undefined) {
      queryParts.push(`isAvailable=${params.isAvailable}`);
    }

    if (params.apartmentTypeIds && params.apartmentTypeIds.length > 0) {
      params.apartmentTypeIds.forEach(x => {
        queryParts.push(`apartmentTypeIds=${x}`);
      })
    }

    if (params.page !== null && params.page !== undefined) {
      queryParts.push(`page=${params.page}`);
    }

    if (params.sorts && params.sorts.length > 0) {
      params.sorts.forEach((sort, index) => {
        if (sort.sortProperty !== null) {
          queryParts.push(`sorts[${index}].SortProperty=${sort.sortProperty}`);
        }
        if (sort.direction !== null) {
          queryParts.push(`sorts[${index}].Direction=${sort.direction}`);
        }
      });
    }

    const queryString = queryParts.join('&');
    return queryString;
  }
}
