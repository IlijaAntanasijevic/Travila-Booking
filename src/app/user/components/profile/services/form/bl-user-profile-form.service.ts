import { Injectable } from '@angular/core';
import { IFormService } from '../../../../../core/interfaces/i-form-service';
import { IUser, IUserRequest } from '../../../../interfaces/i-user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BlUserRequestsService } from '../../../../services/requests/bl-user-requests.service';

@Injectable({
  providedIn: 'root'
})
export class BlUserProfileFormService implements IFormService<IUser> {

  constructor(
    private requestsService: BlUserRequestsService
  ) { }

  form: FormGroup<any> = this.init();

  init(): FormGroup {
    return new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      oldPassword: new FormControl(null),
      newPassword: new FormControl(null),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      avatar: new FormControl(null),
      phone: new FormControl(null, Validators.required),
    })
  }


  setFirstName(value: string) {
    this.form.get("firstName").setValue(value);
  }

  setLastName(value: string) {
    this.form.get("lastName").setValue(value);
  }

  setEmail(value: string) {
    this.form.get("email").setValue(value);
  }

  setPhone(value: string) {
    this.form.get("phone").setValue(value);
  }



  fillForm(user: IUser): void {
    if (user) {
      this.setFirstName(user.firstName);
      this.setLastName(user.lastName);
      this.setEmail(user.email);
      this.setPhone(user.phone);
      this.form.get("newPassword").setValue(null);
      this.form.get("oldPassword").setValue(null);
    }
  }

  prepareDataToSend() {
    let formValue: IUserRequest = this.form.value;


    let dataToSend: IUserRequest = {
      email: formValue.email,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      phone: formValue.phone,
      oldPassword: formValue.oldPassword,
      newPassword: formValue.newPassword,
      avatar: formValue.avatar ?? null

    }

    return dataToSend;
  }


  updateUser(id: number): Observable<any> {
    let data = this.prepareDataToSend();
    return this.requestsService.updateUser(id, data);
  }

  getForm(): FormGroup {
    return this.form;
  }

  getFormData(): IUser {
    return this.form.getRawValue();
  }

  reset(): void {
    this.form = this.init();
  }


}
