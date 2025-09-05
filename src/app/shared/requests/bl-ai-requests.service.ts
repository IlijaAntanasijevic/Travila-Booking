import { Injectable } from '@angular/core';
import { AiApartmentService } from '../api/ai-apartment.service';
import { IAiApartmentRequest, IAiApartmentResponse } from '../interfaces/i-ai-apartment-request';
import { Observable } from 'rxjs';
import { AiChatMessagesService } from '../api/ai-chat-messages.service';

@Injectable({
  providedIn: 'root'
})
export class BlAiRequestsService {

  constructor(
    private aiApartmentService: AiApartmentService,
    private aiChatMessagesService: AiChatMessagesService
  ) { }

  getAiRecommendation(request: IAiApartmentRequest): Observable<IAiApartmentResponse> {
    return this.aiApartmentService.create(request);
  }

  askQuestion(request: IAiApartmentResponse): Observable<IAiApartmentResponse> {
    return this.aiChatMessagesService.create(request);
  }
}
