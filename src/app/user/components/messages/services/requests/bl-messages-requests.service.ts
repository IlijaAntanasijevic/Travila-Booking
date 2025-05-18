import { Injectable } from '@angular/core';
import { MessagesService } from '../api/messages.service';

@Injectable({
  providedIn: 'root'
})
export class BlMessagesRequestsService {

  constructor(
    private apiService: MessagesService
  ) { }

  getAllChats() {
    return this.apiService.getAll();
  }

  getChatMessages(id: number) {
    return this.apiService.getChatMessages(id);
  }
}
