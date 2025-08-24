import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IConfirmEmail } from '../../interfaces/i-auth';
import { ConfirmEmailService } from '../api/confirm-email.service';

@Injectable({
  providedIn: 'root'
})
export class BlConfirmEmailRequestsService {

  constructor(
    private confirmEmailService: ConfirmEmailService
  ) { }

  confirmEmail(data: IConfirmEmail): Observable<any>{
    return this.confirmEmailService.create(data);
  }
}
