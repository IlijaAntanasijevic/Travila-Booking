import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { BlLoginFormService } from '../../services/forms/bl-login-form.service';
import { FormGroup } from '@angular/forms';
import { Spinner } from '../../../core/functions/spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { IToken } from '../../interfaces/i-auth';
import { AuthService } from '../../services/shared/auth.service';
import { BlUserRequestsService } from '../../../user/services/requests/bl-user-requests.service';
import { Subscription } from 'rxjs';
import { ChatService } from '../../../shared/services/chat.service';
import { environment } from '../../../../../env';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    standalone: false
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(
    private formService: BlLoginFormService,
    private authService: AuthService,
    private userRequestService: BlUserRequestsService,
    private router: Router,
    private route: ActivatedRoute,
    private chatService: ChatService
  ) { }

  public form: FormGroup = this.formService.getForm();
  private subscription: Subscription = new Subscription();

  googleData = environment.googleAuth;
  googleUrl: string = '';

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      Spinner.show();
      this.router.navigateByUrl("/home");
    }

    this.googleUrl =
    `https://accounts.google.com/o/oauth2/auth` +
    `?client_id=${this.googleData.clientId}` +
    `&redirect_uri=${encodeURIComponent(this.googleData.redirectUri)}` +
    `&response_type=${this.googleData.responseType}` +
    `&scope=${encodeURIComponent(this.googleData.scope)}`;

    this.route.queryParams.subscribe(params => {
      let isSuccess = params['isSuccess'];
      let token = params['token'];
      
      if (isSuccess == 'true' && token) {
        this.authService.setJwtToken(token);
        this.authService.setPermissions();
        this.setUserData();
        this.chatService.startConnection();
        this.router.navigateByUrl("/home");
      }
    })
  }

  runValidtor(): void {
    this.form.get('email')?.updateValueAndValidity();
    this.form.get('email')?.markAsTouched();
  }

  login(): void {
    Spinner.show();
    this.formService.submit().subscribe({
      next: (data: IToken) => {
        let token: string = data.token;
        this.authService.setJwtToken(token);
        this.authService.setPermissions();
        this.setUserData();
        this.chatService.startConnection();
        this.router.navigateByUrl("/home");
        Spinner.hide();
      },
      error: (err) => {
        Spinner.hide();
        console.log(err.error);
      }
    })

  }


  setUserData(): void {
    let id = this.authService.getUserId();
    this.userRequestService.setUserDataLS(id);
  }


  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
