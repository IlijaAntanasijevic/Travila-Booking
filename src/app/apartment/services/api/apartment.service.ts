import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { apiPaths } from '../../../config/api';
import { IApartment } from '../../interfaces/i-apartment';
import { Observable } from 'rxjs';
import { config } from '../../../config/global';
import { IAddApartmentRequest } from '../../user-apartment/interfaces/i-add-edit-apartment';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService extends ApiService<IApartment> {

  constructor(http: HttpClient) {
    super(apiPaths.apartment.api, http)
  }
}
