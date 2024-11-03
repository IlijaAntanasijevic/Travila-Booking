import { Component, OnInit, signal } from '@angular/core';
import { BlLoginFormService } from '../../services/forms/bl-login-form.service';
import { FormGroup } from '@angular/forms';
import { ILogin } from '../../interfaces/i-auth';
import { BlLoginRequestsService } from '../../services/requests/bl-login-requests.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  constructor(
    private formService: BlLoginFormService,
    private requestsService: BlLoginRequestsService
  ) { }

  public form: FormGroup = this.formService.getForm();

  ngOnInit(): void {
    // this.form.markAllAsTouched();
  }

  runValidtor(): void {    
    this.form.get('email')?.updateValueAndValidity();
    this.form.get('email')?.markAsTouched();
  }

  login(): void {
    let data: ILogin = this.formService.getFormData();
    this.requestsService.login(data).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err.error);
        
      }
    })
    
  }


  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

}
