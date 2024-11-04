import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { IRegister } from '../../interfaces/i-auth';
import { HttpClient } from '@angular/common/http';
import { apiPaths } from '../../../config/api';

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends ApiService<IRegister>{

  constructor(http: HttpClient) {
    super(apiPaths.auth.regiter, http)
  }

}
