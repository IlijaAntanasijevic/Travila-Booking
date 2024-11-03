import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { apiPaths } from '../../config/api';
import { IApartment } from '../interfaces/i-apartment';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService extends ApiService<IApartment>{

  constructor(http: HttpClient) {
    super(apiPaths.apartment, http)
  }
}
