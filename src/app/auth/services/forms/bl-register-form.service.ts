import { Injectable } from '@angular/core';
import { IFormService } from '../../../core/interfaces/i-form-service';
import { IRegister, IRegisterRequest } from '../../interfaces/i-auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { charactersOnlyValidator } from '../../../core/validators/characters-only-validator';
import { passwordValidator } from '../../../core/validators/password-validator';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterService } from '../api/register.service';

@Injectable({
  providedIn: 'root'
})
export class BlRegisterFormService implements IFormService<IRegister>{

  constructor(
    private registerService: RegisterService
  ) { }

  public registerEmail: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  form: FormGroup<any> = this.init();

  init(): FormGroup {
    return new FormGroup({
      email: new FormControl("ilijatest10@test.com", [Validators.required, Validators.email]),
      password: new FormControl("Ilija123!", [Validators.required, passwordValidator()] ),
      firstName: new FormControl("Ilija", [Validators.required, Validators.minLength(3), charactersOnlyValidator()]),
      lastName: new FormControl("Test", [Validators.required, Validators.minLength(3), charactersOnlyValidator()]),
      phone: new FormControl("213213123", [Validators.required, Validators.minLength(5), Validators.maxLength(17)]),
      avatar: new FormControl(null),
    })
  }

  getForm(): FormGroup {
    return this.form;
  }

  getFormData(): IRegister {
    return this.form.getRawValue();
  }

  prepareDataToSend(): IRegisterRequest {
    const data = this.getFormData();

   let dataToSend: IRegisterRequest = {
     email: data.email,
     password: data.password,
     firstName: data.firstName,
     lastName: data.lastName,
     phone: data.phone.toString(),
     avatar: null
   }

    return dataToSend;
  }

  submit(): Observable<any> {
    let data = this.prepareDataToSend();
    return this.registerService.create(data);
  }

  reset(): void {
    this.form = this.init();
  }
}
