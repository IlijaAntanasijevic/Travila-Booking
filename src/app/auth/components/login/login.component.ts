import { Component, OnInit, signal } from '@angular/core';
import { BlLoginFormService } from '../../services/forms/bl-login-form.service';
import { FormGroup } from '@angular/forms';
import { BlLoginRequestsService } from '../../services/requests/bl-login-requests.service';
import { Spinner } from '../../../core/functions/spinner';

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
    Spinner.show();
    this.formService.submit().subscribe({
      next: (data) => {
        console.log(data);
        Spinner.hide();
      },
      error: (err) => {
        Spinner.hide();
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
