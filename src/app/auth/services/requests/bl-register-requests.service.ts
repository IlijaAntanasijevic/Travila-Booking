import { Injectable } from '@angular/core';
import { LoginService } from '../api/login.service';
import { Observable } from 'rxjs';
import { ILogin, IRegister } from '../../interfaces/i-auth';
import { RegisterService } from '../api/register.service';

@Injectable({
  providedIn: 'root'
})
export class BlRegisterRequestsService {

  constructor(
    private registerService: RegisterService
  ) { }

  register(data: IRegister): Observable<any>{
    return this.registerService.create(data);
  }
}
