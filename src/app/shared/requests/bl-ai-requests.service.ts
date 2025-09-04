import { Injectable } from '@angular/core';
import { AiApartmentService } from '../api/ai-apartment.service';
import { IAiApartmentRequest, IAiApartmentResponse } from '../interfaces/i-ai-apartment-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlAiRequestsService {

  constructor(
    private aiApartmentService: AiApartmentService
  ) { }

  getAiRecommendation(request: IAiApartmentRequest): Observable<IAiApartmentResponse> {
    return this.aiApartmentService.create(request);
  }
}
