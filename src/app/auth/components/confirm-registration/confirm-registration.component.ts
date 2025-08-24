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
    code: new FormControl("", [Validators.required, Validators.minLength(6)])
  })

  timeLeft: number = 5 * 60; // 5 minutes in seconds
  timerDisplay: string = '05:00';
  private timerSubscription: Subscription;
  private TIMER_KEY_LS: string = 'confirm_registration_timer';
  private TIMER_START_KEY_LS: string = 'confirm_registration_timer_start';

  ngOnInit(): void {
    this.getEmailForConfirmation();
    this.initializeTimer();
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  initializeTimer(): void {
    const savedTimerStart = localStorage.getItem(this.TIMER_START_KEY_LS);
    const savedTimeLeft = localStorage.getItem(this.TIMER_KEY_LS);
    
    if (savedTimerStart && savedTimeLeft) {
      const startTime = parseInt(savedTimerStart);
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      const remainingTime = parseInt(savedTimeLeft) - elapsedTime;
      
      if (remainingTime > 0) {
        this.timeLeft = remainingTime;
        this.updateTimerDisplay();
        this.startTimer();
      } else {
        this.clearTimerStorage();
        this.alertService.warning('Time expired. Please request a new code.');
      }
    } else {
      // First time or no saved timer
      this.startFreshTimer();
    }
  }

  startFreshTimer(): void {
    this.timeLeft = 5 * 60;
    this.updateTimerDisplay();
    this.saveTimerStart();
    this.startTimer();
  }

  startTimer(): void {
    this.timerSubscription = interval(1000).subscribe(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.updateTimerDisplay();
        this.saveTimerState();
      } else {
        this.timerSubscription.unsubscribe();
        this.clearTimerStorage();
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
    localStorage.setItem(this.TIMER_START_KEY_LS, Date.now().toString());
  }

  saveTimerState(): void {
    localStorage.setItem(this.TIMER_KEY_LS, this.timeLeft.toString());
  }

  clearTimerStorage(): void {
    localStorage.removeItem(this.TIMER_KEY_LS);
    localStorage.removeItem(this.TIMER_START_KEY_LS);
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
    if (this.form.valid && this.email) {
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
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          this.isLoading = false;
        }
      });
    }
    else {
      this.alertService.error("Please contact our support", "Unexpected Error")
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
          this.alertService.warning("The code has been sent. Check your email")
        },
        error: (error) => {
          this.isLoading = false;
        }
      });
    }
  }
}
