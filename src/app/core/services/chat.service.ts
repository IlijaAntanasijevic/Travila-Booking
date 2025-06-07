import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { config } from '../../config/global';
import { IMessages } from '../../user/components/messages/interfaces/i-messages';
import { AuthService } from '../../auth/services/shared/auth.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor
  (
    private authService: AuthService
  )
  {}

  private hubConnection!: signalR.HubConnection;
  public messageRecived: Subject<IMessages> = new Subject<IMessages>();
  public openedChat: Subject<number> = new Subject<number>();

  startConnection(): void {
    console.log(this.authService.getJwtToken());
    
    this.hubConnection = new signalR.HubConnectionBuilder()
    // .withUrl(config.apiUrl + 'chat-hub')
      .withUrl(config.apiUrl + 'chat-hub', {
      accessTokenFactory: () => this.authService.getJwtToken()
    })
    .withAutomaticReconnect()
    .build();

    this.hubConnection.start().then(() => {
      console.log('Connection started')
      this.hubConnection?.on('ReceiveMessage', (message: IMessages) => {
        this.messageRecived.next(message);
      })
    })
    .catch(err => console.log('Error while starting connection: ' + err));
  }

  sendMessage(receiverId: number,message: string): void {
    this.hubConnection.invoke('SendMessage', receiverId, message)
    .catch(err => console.error('sendMessage' + err));
  }

  onReceiveMessage(callback: (message: IMessages) => void): void {
    this.hubConnection?.on('ReceiveMessage', callback);
  }
}
