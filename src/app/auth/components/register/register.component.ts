import { Component, signal } from '@angular/core';
import { BlRegisterFormService } from '../../services/forms/bl-register-form.service';
import { FormGroup } from '@angular/forms';
import { IRegister } from '../../interfaces/i-auth';
import { Spinner } from '../../../core/functions/spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../../env';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    standalone: false
})
export class RegisterComponent {

  constructor(
    private formService: BlRegisterFormService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: ToastrService
  ) { }

  googleData = environment.googleAuth;
  googleUrl: string = '';
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }


  public form: FormGroup = this.formService.getForm();

  ngOnInit(): void {

      this.googleUrl =
      `https://accounts.google.com/o/oauth2/auth` +
      `?client_id=${this.googleData.clientId}` +
      `&redirect_uri=${encodeURIComponent(this.googleData.redirectUri)}` +
      `&response_type=${this.googleData.responseType}` +
      `&scope=${encodeURIComponent(this.googleData.scope)}`;

    this.route.queryParams.subscribe(params => {
      let isSuccess = params['isSuccess'];
      console.log(params);
      
      if (isSuccess == 'false') {
        if(params['error']) {
          this.alertService.error(params['error']);
        }
        else {
        this.alertService.error('Registration failed. Please try again.');
        }
      }

    })
    // this.form.markAllAsTouched();
  }


  register(): void {
    Spinner.show();
    this.formService.submit().subscribe({
      next: (data) => {
        let email = this.formService.getFormData().email;
        this.formService.registerEmail.next(email);
        localStorage.setItem("registration", email);
        this.formService.reset();
        this.alertService.success('Registration successful. Please confirm your email.');
        this.router.navigate(["/auth/confirm"])
        Spinner.hide();
      },
      error: (err) => {
        Spinner.hide();
      }
    })
  }

  fileUpload(event: any): void {

  }

  previewImage(e: any): void {

  }
}
