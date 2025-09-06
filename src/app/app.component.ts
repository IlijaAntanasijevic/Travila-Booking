import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/shared/auth.service';
import { ChatService } from './shared/services/chat.service';
import { IMessages } from './user/components/messages/interfaces/i-messages';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
    private alertService: ToastrService,
    private router: Router
  ) { }

  title = 'travila-front';

  ngOnInit(): void {

    const isLoggedIn = this.authService.isLoggedIn();

    if (isLoggedIn) {
      this.chatService.startConnection(); 
    }

    this.chatService.messageRecived.subscribe((message: IMessages) => {
      const currentUserId = this.authService.getUserId();
       if (message.senderId !== currentUserId && this.router.url !== '/user/messages') {
        this.alertService.info("New message received");
      }
    })

  }
}
