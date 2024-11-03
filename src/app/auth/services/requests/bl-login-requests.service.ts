import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin, IToken } from '../../interfaces/i-auth';
import { LoginService } from '../api/login.service';

@Injectable({
  providedIn: 'root'
})
export class BlLoginRequestsService {

  constructor(
    private loginService: LoginService
  ) { }

  login(data: ILogin): Observable<IToken> {
    return this.loginService.create(data);
  }
}
