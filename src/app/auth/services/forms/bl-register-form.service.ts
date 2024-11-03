import { Injectable } from '@angular/core';
import { IFormService } from '../../../core/interfaces/i-form-service';
import { IRegister } from '../../interfaces/i-auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { charactersOnlyValidator } from '../../../core/validators/characters-only-validator';
import { passwordValidator } from '../../../core/validators/password-validator';

@Injectable({
  providedIn: 'root'
})
export class BlRegisterFormService implements IFormService<IRegister>{

  constructor() { }

  form: FormGroup<any> = this.init();

  init(): FormGroup {
    return new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, passwordValidator()] ),
      firstName: new FormControl("", [Validators.required, Validators.minLength(3), charactersOnlyValidator()]),
      lastName: new FormControl("", [Validators.required, Validators.minLength(3), charactersOnlyValidator()]),
      phone: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(17)]),
      avatar: new FormControl(""),
    })
  }

  getForm(): FormGroup {
    return this.form;
  }

  getFormData(): IRegister {
    return this.form.getRawValue();
  }

  reset(): void {
    this.form = this.init();
  }
}
