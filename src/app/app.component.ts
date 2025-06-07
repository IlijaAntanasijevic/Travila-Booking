import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/shared/auth.service';
import { ChatService } from './core/services/chat.service';
import { IMessages } from './user/components/messages/interfaces/i-messages';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: false
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private alertService: ToastrService
  ) { }

  title = 'travila-front';

  ngOnInit(): void {

    const isLoggedIn = this.authService.isLoggedIn();

    if (isLoggedIn) {
      this.chatService.startConnection(); 
    }

    this.chatService.messageRecived.subscribe((message: IMessages) => {
      const currentUserId = this.authService.getUserId();
       if (message.senderId !== currentUserId ) {
        this.alertService.info("New message received");
      }
    })

  }
}
