import { Component, OnInit, signal } from '@angular/core';
import { BlLoginFormService } from '../../services/forms/bl-login-form.service';
import { FormGroup } from '@angular/forms';
import { Spinner } from '../../../core/functions/spinner';
import { Router } from '@angular/router';
import { IToken } from '../../interfaces/i-auth';
import { AuthService } from '../../services/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  constructor(
    private formService: BlLoginFormService,
    private authService: AuthService,
    private router: Router
  ) { }

  public form: FormGroup = this.formService.getForm();

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      Spinner.show();
      this.router.navigateByUrl("/home");
    }
    // this.form.markAllAsTouched();
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
        this.router.navigateByUrl("/home");
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
