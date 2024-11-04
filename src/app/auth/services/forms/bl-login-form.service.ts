import { Injectable } from '@angular/core';
import { IFormService } from '../../../core/interfaces/i-form-service';
import { ILogin, ILoginRequest } from '../../interfaces/i-auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BlLoginRequestsService } from '../requests/bl-login-requests.service';

@Injectable({
  providedIn: 'root'
})
export class BlLoginFormService implements IFormService<ILogin>{

  constructor(
    private requestsService: BlLoginRequestsService
  ) { }

  form: FormGroup<any> = this.init();

  init(): FormGroup {
    return new FormGroup({
      email: new FormControl("test@gmail.com", [Validators.required, Validators.email]),
      password: new FormControl("Ilija123", Validators.required)
    })
  }
  getForm(): FormGroup {
    return this.form;
  }

  getFormData(): ILogin {
    return this.form.getRawValue();
  }

  prepareDataToSend(): ILoginRequest {
    const data = this.getFormData();

    let dataToSend: ILoginRequest = {
      email: data.email,
      password: data.password
    }

    return dataToSend;
  }

  submit(): Observable<any> {
    let data = this.prepareDataToSend();
    return this.requestsService.login(data);
  }



  reset(): void {
    this.form = this.init();
  }
}
