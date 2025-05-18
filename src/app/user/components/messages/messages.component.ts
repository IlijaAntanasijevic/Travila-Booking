import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { charactersOnlyValidator } from '../../../core/validators/characters-only-validator';
import { passwordValidator } from '../../../core/validators/password-validator';
import { BlMessagesRequestsService } from './services/requests/bl-messages-requests.service';
import { Subscription } from 'rxjs';
import { IChatList, IMessages } from './interfaces/i-messages';
import { Spinner } from '../../../core/functions/spinner';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrl: './messages.component.css',
    standalone: false
})
export class MessagesComponent implements OnInit, OnDestroy {

  constructor(
    private requestsService: BlMessagesRequestsService
  ) {}

  form = new FormGroup({
    text: new FormControl("", Validators.required),
  });

  private subscription: Subscription = new Subscription();  
  public messagesList: IChatList[] = [];
  public chatMessages: IMessages[] = [];
  public selectedChatReceiverId: number | null = null;

  ngOnInit(): void {
    this.getChatList();
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
          console.log(data);
          this.chatMessages = data;
          // Spinner.hide();
        },
        error: (error) => {
          // Spinner.hide();
        }
      })
    );
  }


  sendMessage(): void {
    let value = this.form.getRawValue().text;

    alert("SEND: " + value)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
