import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BlForgotPasswordService } from '../../services/requests/bl-forgot-password.service';
import { Subscription } from 'rxjs';
import { Spinner } from '../../../core/functions/spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  constructor(
    private fb: FormBuilder,
    private requestsService: BlForgotPasswordService,
    private alertService: ToastrService,
    private router: Router
  ) { }

  step: 'email' | 'code' | 'password' = 'email';
  isLoading = false;
  email: string = '';
  code: string = '';
  private subscription: Subscription = new Subscription();

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    newPassword: ['', [Validators.required, Validators.minLength(6)]]
  });

  sendEmail() {
    if (this.form.get('email').invalid) return;

    Spinner.show();
    this.isLoading = true;
    let email = this.form.get('email').value;

    this.subscription.add(
      this.requestsService.requestCode(email).subscribe({
        next: () => {
          this.isLoading = false;
          this.email = email;
          this.step = 'code';
          this.alertService.success('Verification code sent to email.');
          Spinner.hide();
        },
        error: () => {
          this.isLoading = false;
          Spinner.hide();
          this.alertService.error('Error sending email.');
        }
      })
    )

  }

  confirmCode() {
    if (this.form.get('code').invalid) return;
    Spinner.show();

    let code = this.form.get('code').value;
    this.isLoading = true;

    this.subscription.add(
      this.requestsService.confirmCode(this.email, code).subscribe({
        next: () => {
          this.isLoading = false;
          this.code = code;
          this.step = 'password';
          this.alertService.success('Code confirmed. Enter new password.');
          Spinner.hide();
        },
        error: () => {
          this.isLoading = false;
          Spinner.hide();
        }
      })
    )
  }

  renewPassword() {
    if (this.form.get('newPassword').invalid) return;
    Spinner.show();
    let newPass = this.form.get('newPassword').value
    this.isLoading = true;
    this.requestsService.renewPassword(this.email, newPass, this.code).subscribe({
      next: () => {
        this.isLoading = false;
        this.alertService.success('Password changed successfully.');
        Spinner.hide();
        this.form.reset();
        this.router.navigate(["auth/login"])
      },
      error: () => {
        this.isLoading = false;
        Spinner.hide();
        this.alertService.error('Error changing password.');
      }
    });
  }

  resendCode() {
    this.sendEmail();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
