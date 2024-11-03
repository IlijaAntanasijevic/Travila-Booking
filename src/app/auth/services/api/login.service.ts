import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { ILogin, IToken } from '../../interfaces/i-auth';
import { HttpClient } from '@angular/common/http';
import { apiPaths } from '../../../config/api';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends ApiService<IToken> {

  constructor(http: HttpClient) {
    super(apiPaths.auth.login, http)
  }
}
