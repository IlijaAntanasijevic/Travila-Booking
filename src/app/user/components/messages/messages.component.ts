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
import { BlMessagesDataService } from './services/shared/bl-messages-data.service';

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
    private chatDataService: BlMessagesDataService
  ) {}

  form = new FormGroup({
    text: new FormControl("", Validators.required)
  });

  @ViewChild('chatContainer') private chatContainer: ElementRef;
  private subscription: Subscription = new Subscription();  
  public messagesList: IChatList[] = [];
  public chatMessages: IMessages[] = [];
  public selectedChatReceiverId: number | null = null;
  public isPrepareChat: boolean = false;

  ngOnInit(): void {
    this.getChatList();
    //this.chatService.startConnection();
    this.subscription.add(
      this.chatDataService.prepareChat.subscribe({
        next: (receiverId: number) => {
          if (receiverId > 0) {
        //      queueMicrotask(() => {
        //   this.getOrCreateChat(receiverId);
        //   this.isPrepareChat = true;
        //   this.selectedChatReceiverId = receiverId;
        // });
             this.getOrCreateChat(receiverId);
          this.isPrepareChat = true;
          this.selectedChatReceiverId = receiverId;
          } 
        }
      })
    )

    this.chatService.onReceiveMessage((message: IMessages) => {
    if(this.selectedChatReceiverId != null && this.selectedChatReceiverId == message.senderId){
        this.chatMessages.push(message);
        setTimeout(() =>  this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight, 0);
      }
    });
  }

  getOrCreateChat(receiverId: number) {
    Spinner.show();
    this.subscription.add(
      this.requestsService.getOrCreateChat(receiverId).subscribe({
        next: (data) => {
          // this.chatMessages = [];
          this.selectedChatReceiverId = data.chatInfo.receiverId;
          
          if(data.messages?.length > 0) {
            this.chatMessages = data.messages;
          }
          if(data.chatInfo.id) {

          }
          let alreadyExists = this.messagesList.find(chat => chat.receiverId === data.chatInfo.receiverId);
          if(!alreadyExists) {
            this.messagesList.push(data.chatInfo);
          }
          
          console.log(data.messages);
          
          console.log(this.chatMessages);
          
          // setTimeout(() =>  this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight, 0);
          Spinner.hide();
        },
        error: (error) => {
          Spinner.hide();
        }
      })
    );
  }

  getChatList(): void {
    Spinner.show();
    this.subscription.add(
      this.requestsService.getAllChats().subscribe({
        next: (data) => {
          this.messagesList = data;
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
          console.log("TU");
          
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

    console.log(this.chatMessages);
    
    this.chatMessages.push(newMessage);
    setTimeout(() =>  this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight, 0);
  }

  ngOnDestroy(): void {
    console.log('MessagesComponent destroyed');
    
    this.subscription.unsubscribe();
    this.chatDataService.prepareChat.next(0);
  }
}
