import { Component, signal } from '@angular/core';
import { BlRegisterFormService } from '../../services/forms/bl-register-form.service';
import { FormGroup } from '@angular/forms';
import { IRegister } from '../../interfaces/i-auth';
import { Spinner } from '../../../core/functions/spinner';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    standalone: false
})
export class RegisterComponent {

  constructor(
    private formService: BlRegisterFormService,
    private router: Router
  ) { }

  
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }


  public form: FormGroup = this.formService.getForm();

  ngOnInit(): void {
    // this.form.markAllAsTouched();
  }


  register(): void {
    Spinner.show();
    this.formService.submit().subscribe({
      next: (data) => {
        let email = this.formService.getFormData().email;
        this.formService.registerEmail.next(email);
        localStorage.setItem("registration", email);
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
