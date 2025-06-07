import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { charactersOnlyValidator } from '../../../core/validators/characters-only-validator';
import { passwordValidator } from '../../../core/validators/password-validator';
import { BlMessagesRequestsService } from './services/requests/bl-messages-requests.service';
import { Subscription } from 'rxjs';
import { IChatList, IMessages } from './interfaces/i-messages';
import { Spinner } from '../../../core/functions/spinner';
import { ChatService } from '../../../core/services/chat.service';
import { AuthService } from '../../../auth/services/shared/auth.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrl: './messages.component.css',
    standalone: false
})
export class MessagesComponent implements OnInit, OnDestroy {

  constructor(
    private requestsService: BlMessagesRequestsService,
    private chatService: ChatService,
    private authService: AuthService,
  ) {}

  form = new FormGroup({
    text: new FormControl("", Validators.required)
  });

  @ViewChild('chatContainer') private chatContainer: ElementRef;
  private subscription: Subscription = new Subscription();  
  public messagesList: IChatList[] = [];
  public chatMessages: IMessages[] = [];
  public selectedChatReceiverId: number | null = null;

  ngOnInit(): void {
    this.getChatList();

    //this.chatService.startConnection();

    this.chatService.onReceiveMessage((message: IMessages) => {
    if(this.selectedChatReceiverId != null && this.selectedChatReceiverId == message.senderId){
      this.chatMessages.push(message);
    setTimeout(() =>  this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight, 0);

    }

    });
  }

  getChatList(): void {
    Spinner.show();
    this.subscription.add(
      this.requestsService.getAllChats().subscribe({
        next: (data) => {
          this.messagesList = data;

          // this.getChatMessages(this.messagesList[0]?.id);
          
          Spinner.hide();
        },
        error: (error) => {
          Spinner.hide();
        }
      })
    );
  }

  getChatMessages(id: number): void {
    // Spinner.show();
    this.selectedChatReceiverId = id;
    this.subscription.add(
      this.requestsService.getChatMessages(id).subscribe({
        next: (data) => {
          setTimeout(() =>  this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight, 0);
          this.chatMessages = data;
          // Spinner.hide();
        },
        error: (error) => {
          // Spinner.hide();
        }
      })
    );

    this.subscription.add(
      this.chatService.openedChat.next(id)
    )
  }


  sendMessage(): void {
    let message = this.form.getRawValue().text;
    const receiverId = this.selectedChatReceiverId; 
    // const senderId = this.authService.getUserId();
    
    
    this.chatService.sendMessage(receiverId, message);
   
    this.form.get('text')?.reset(); 

    const newMessage: IMessages = {
      message,
      receiverId,
      senderId: this.authService.getUserId(),
      isMineMessage: true,
      id: 0,
      sentAt: new Date(),
      isRead: false
    };

    this.chatMessages.push(newMessage);
    setTimeout(() =>  this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight, 0);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
