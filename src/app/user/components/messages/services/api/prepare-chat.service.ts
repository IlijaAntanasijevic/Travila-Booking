import { Injectable } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';
import { IPrepareChat } from '../../interfaces/i-messages';
import { HttpClient } from '@angular/common/http';
import { apiPaths } from '../../../../../config/api';

@Injectable({
  providedIn: 'root'
})
export class PrepareChatService extends ApiService<IPrepareChat>{

  constructor(http: HttpClient) {
    super(apiPaths.chatMessages.prepareChat, http);
   }
}
