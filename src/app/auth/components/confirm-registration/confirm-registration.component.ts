import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlRegisterFormService } from '../../services/forms/bl-register-form.service';
import { BlConfirmEmailRequestsService } from '../../services/requests/bl-confirm-email-requests.service';
import { BlResendCodeRequestsService } from '../../services/requests/bl-resend-code-requests.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IConfirmEmail } from '../../interfaces/i-auth';
import { ToastrService } from 'ngx-toastr';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-confirm-registration',
  standalone: false,
  templateUrl: './confirm-registration.component.html',
  styleUrl: './confirm-registration.component.css'
})
export class ConfirmRegistrationComponent implements OnInit, OnDestroy{

  constructor(
    private formService: BlRegisterFormService,
    private confirmEmailService: BlConfirmEmailRequestsService,
    private resendCodeService: BlResendCodeRequestsService,
    private router: Router,
    private alertService: ToastrService
  ) {}

  email: string = null;
  isLoading: boolean = false;
  form: FormGroup = new FormGroup({
    code: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
  })

  timeLeft: number = 2 * 60; // 2 minutes in seconds
  timerDisplay: string = '02:00';
  private timerSubscription: Subscription = new Subscription();
  private TIMER_END_KEY_LS: string = 'confirm_registration_timer_end';

  ngOnInit(): void {
    this.getEmailForConfirmation();
    const lsEmail = localStorage.getItem("registration");
    
    if (this.email && lsEmail && this.email === lsEmail) {
      this.initializeTimer();
    } else {
      this.alertService.error('Email is missing.');
      this.clearTimerStorage();
    }
  }


  initializeTimer(): void {
    const savedTimerEnd = localStorage.getItem(this.TIMER_END_KEY_LS);
    
    if (savedTimerEnd) {
      const endTime: number = parseInt(savedTimerEnd);
      const remainingTime: number = Math.floor((endTime - Date.now()) / 1000);
      
      if (remainingTime  > 0) {
        this.timeLeft = remainingTime ;
        this.updateTimerDisplay();
        this.startTimer();
      } else {
        // this.clearTimerStorage();
        this.timeLeft = 0;
        this.alertService.warning('Time expired. Please request a new code.');
      }
    } else {
      this.startFreshTimer();
    }
  }

  startFreshTimer(): void {
    this.timeLeft = 2 * 60;
    this.updateTimerDisplay();
    this.saveTimerStart();
    this.startTimer();
  }

  startTimer(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.updateTimerDisplay();
      } else {
        this.timerSubscription.unsubscribe();
        // this.clearTimerStorage();
        this.timeLeft = 0;
        this.alertService.warning('Time expired. Please request a new code.');
      }
    });
  }

  updateTimerDisplay(): void {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    this.timerDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  resetTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.startFreshTimer();
  }

  saveTimerStart(): void {
    const endTime = Date.now() + this.timeLeft * 1000;
    localStorage.setItem(this.TIMER_END_KEY_LS, endTime.toString());
  }

  clearTimerStorage(): void {
    localStorage.removeItem(this.TIMER_END_KEY_LS);
  }

  getEmailForConfirmation(): void {
    this.formService.registerEmail.subscribe({
      next: (data) => {
        if(data) {
          this.email = data;
        }
        else {
          let lsEmail = localStorage.getItem("registration");

          if(lsEmail){
            this.email = lsEmail;
          }
        }
      }
    })
  }

  confirm(): void {
    const lsEmail = localStorage.getItem("registration");
    if (this.form.valid && this.email && lsEmail && this.email === lsEmail) {
      this.isLoading = true;
      const confirmData: IConfirmEmail = {
        email: this.email,
        code: this.form.get('code').value
      };
      this.confirmEmailService.confirmEmail(confirmData).subscribe({
        next: (response) => {
          this.isLoading = false;
          localStorage.removeItem("registration");
          this.clearTimerStorage();

          this.alertService.success("You have successfully registered.")
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          this.isLoading = false;
        }
      });
    } else {
      this.alertService.error("Email is missing.", "Unexpected Error");
      this.clearTimerStorage();
    }
  }

  resendCode(): void {
    if (this.email) {
      this.isLoading = true;
      this.startFreshTimer();
      this.resendCodeService.resendCode(this.email).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.resetTimer();
          this.alertService.success("The code has been sent. Check your email")
        },
        error: (error) => {
          this.isLoading = false;
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
    // this.clearTimerStorage();
  }
}
