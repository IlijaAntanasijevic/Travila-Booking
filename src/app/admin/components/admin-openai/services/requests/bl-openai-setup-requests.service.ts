import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOpenAIConfig, IOpenAIConfigData, IOpenAiUserConversation } from '../../interfaces/i-openai-setup';
import { OpenaiSetupService } from '../api/openai-setup.service';
import { OpenaiConversationsService } from '../api/openai-conversations.service';

@Injectable({
  providedIn: 'root'
})
export class BlOpenaiSetupRequestsService {

  constructor(
    private adminOpenAIService: OpenaiSetupService,
    private openAiUserConversationsService: OpenaiConversationsService
  ) { }

  getOpenAIConfig(): Observable<IOpenAIConfig> {
    return this.adminOpenAIService.getAllObject();
  }

  createOpenAIConfig(data: IOpenAIConfigData): Observable<any> {
    return this.adminOpenAIService.create(data);
  }

  getOpenAiUserConversations(): Observable<IOpenAiUserConversation[]> {
    return this.openAiUserConversationsService.getAll();
  }
}
