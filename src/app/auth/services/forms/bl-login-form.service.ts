import { Injectable } from '@angular/core';
import { IFormService } from '../../../core/interfaces/i-form-service';
import { ILogin } from '../../interfaces/i-auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BlLoginFormService implements IFormService<ILogin>{

  constructor() { }

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

  reset(): void {
    this.form = this.init();
  }
}
