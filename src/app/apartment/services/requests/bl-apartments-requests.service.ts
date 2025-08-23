import { Injectable } from '@angular/core';
import { ApartmentService } from '../api/apartment.service';
import { Observable } from 'rxjs';
import { IApartmentSearch } from '../../interfaces/i-apartment';
import { toUTCDateString } from '../../../core/helpers/utility';
import { BlFavoriteApartmentsRequestsService } from '../../../user/components/favorite-apartments/services/requests/bl-favorite-apartments-requests.service';
import { ArchiveService } from '../../user-apartment/services/api/archive.service';
import { IDefaultPagination } from '../../../core/interfaces/i-base';
import { ApartmentActivateService } from '../api/apartment-activate.service';

@Injectable({
  providedIn: 'root'
})
export class BlApartmentsRequestsService {

  constructor(
    private apartmentService: ApartmentService,
    private favoriteApartmentsRequestService: BlFavoriteApartmentsRequestsService,
    private archiveService: ArchiveService,
    private activateApartmentService: ApartmentActivateService
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

  deleteApartment(id: number): Observable<any> {
    return this.apartmentService.delete(id);
  }

  activateApartment(id: number): Observable<any> {
    return this.activateApartmentService.update(id, null);
  }

  addToFavorite(apartmentId: number): Observable<any> {
    return this.favoriteApartmentsRequestService.addToFavorite(apartmentId);
  }

  getArchivedApartments(params: IDefaultPagination): Observable<any> {
    let paramsToSend = this.prepareQuery(params);
    return this.archiveService.getAllByQueryParams(paramsToSend);
  }

  archiveApartment(id: number): Observable<any> {
    return this.archiveService.update(id, null);
  }

  private prepareQuery(params: IApartmentSearch): string {
    const queryParts: string[] = [];
    if (params.keyword !== null && params.keyword !== undefined) {
      queryParts.push(`keyword=${params.keyword}`);
    }
    if (params.maxPrice !== null && params.maxPrice != undefined) {
      queryParts.push(`maxPrice=${params.maxPrice}`);
    }
    if (params.perPage !== null && params.perPage != undefined) {
      queryParts.push(`perPage=${params.perPage}`);
    }
    if (params.page !== null && params.page !== undefined) {
      queryParts.push(`page=${params.page}`);
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
    if (params.showOnlyMyApartment !== null && params.showOnlyMyApartment !== undefined) {
      queryParts.push(`showOnlyMyApartment=${params.showOnlyMyApartment}`);
    }
    if (params.isAvailable !== null && params.isAvailable !== undefined) {
      queryParts.push(`isAvailable=${params.isAvailable}`);
    }
    if (params.adults !== null && params.adults !== undefined) {
      queryParts.push(`adults=${params.adults}`);
    }
    if (params.childrens !== null && params.childrens !== undefined) {
      queryParts.push(`childrens=${params.childrens}`);
    }
    if (params.totalRooms !== null && params.totalRooms !== undefined) {
      queryParts.push(`totalRooms=${params.totalRooms}`);
    }

    if (params.apartmentTypeIds && params.apartmentTypeIds.length > 0) {
      params.apartmentTypeIds.forEach(x => {
        queryParts.push(`apartmentTypeIds=${x}`);
      })
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
