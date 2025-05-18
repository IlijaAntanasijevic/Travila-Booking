import { Injectable } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';
import { IChatList, IMessages } from '../../interfaces/i-messages';
import { HttpClient } from '@angular/common/http';
import { apiPaths } from '../../../../../config/api';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService extends ApiService<IChatList> {

  constructor(http: HttpClient) 
  {
    super(apiPaths.chatMessages.api, http)
  }

  getChatMessages(id: number): Observable<IMessages[]>{
    return this.http.get<IMessages[]>(this.apiUrl + this.url + "/" + id).pipe(
      catchError((error) => this.handleErrors(error))
    );
  }
}
