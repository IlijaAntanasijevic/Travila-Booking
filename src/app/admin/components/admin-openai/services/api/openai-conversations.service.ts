import { Injectable } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { apiPaths } from '../../../../../config/api';
import { IOpenAiUserConversation } from '../../interfaces/i-openai-setup';

@Injectable({
  providedIn: 'root'
})
export class OpenaiConversationsService extends ApiService<IOpenAiUserConversation>{

  constructor(http: HttpClient) {
    super(apiPaths.admin.openAiConversations, http)
  }
}
