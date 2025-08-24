import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResendCodeService } from '../api/resend-code.service';

@Injectable({
  providedIn: 'root'
})
export class BlResendCodeRequestsService {

  constructor(
    private resendCodeService: ResendCodeService
  ) { }

  resendCode(email: string): Observable<any>{
    return this.resendCodeService.create({ email });
  }
}
