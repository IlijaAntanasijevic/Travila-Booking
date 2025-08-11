import { Injectable } from '@angular/core';
import { MessagesService } from '../api/messages.service';
import { PrepareChatService } from '../api/prepare-chat.service';
import { Observable } from 'rxjs';
import { IPrepareChat } from '../../interfaces/i-messages';

@Injectable({
  providedIn: 'root'
})
export class BlMessagesRequestsService {

  constructor(
    private apiService: MessagesService,
    private prepareChatService: PrepareChatService
  ) { }

  getAllChats() {
    return this.apiService.getAll();
  }

  getChatMessages(id: number) {
    return this.apiService.getChatMessages(id);
  }

  getOrCreateChat(receiverId: number): Observable<IPrepareChat> {
    return this.prepareChatService.getOne(receiverId);
  }
}
