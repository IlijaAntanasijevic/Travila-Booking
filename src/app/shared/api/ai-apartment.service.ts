import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { IAiApartmentRequest, IAiApartmentResponse } from '../interfaces/i-ai-apartment-request';
import { apiPaths } from '../../config/api';

@Injectable({
  providedIn: 'root'
})
export class AiApartmentService extends ApiService<IAiApartmentResponse> {
  constructor(http: HttpClient) {
    super(apiPaths.apartment.ai, http);
  }
 
}
