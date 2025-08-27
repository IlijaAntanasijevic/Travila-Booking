import { Injectable } from '@angular/core';
import { ForgotPasswordService } from '../api/forgot-password.service';
import { Observable } from 'rxjs';
import { ChangePasswordService } from '../api/change-password.service';

@Injectable({
  providedIn: 'root'
})
export class BlForgotPasswordService {

  constructor(
    private apiService: ForgotPasswordService,
    private changePassService: ChangePasswordService
  ) { }

  requestCode(email: string): Observable<any> {
    return this.apiService.create({email: email});
  }

  confirmCode(email: string, code: string): Observable<any> {
    return this.apiService.update(null, {email, code});
  }

  renewPassword(email: string, newPassword: string, code: string): Observable<any> {
    return this.changePassService.update(null, { email, newPassword, code });
  }
}
