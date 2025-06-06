import { Injectable } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { apiPaths } from '../../../../../config/api';

@Injectable({
  providedIn: 'root'
})
export class FavoriteApartmentsService extends ApiService<any> {

  constructor(http: HttpClient) {
    super(apiPaths.apartment.favorite, http)
  }
}
