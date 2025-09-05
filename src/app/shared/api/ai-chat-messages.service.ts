import { Injectable } from '@angular/core';
import { IAiApartmentResponse } from '../interfaces/i-ai-apartment-request';
import { ApiService } from '../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { apiPaths } from '../../config/api';

@Injectable({
  providedIn: 'root'
})
export class AiChatMessagesService extends ApiService<IAiApartmentResponse> {
  
  constructor(http: HttpClient) {
    super(apiPaths.apartment.aiChat, http);
  }
}
