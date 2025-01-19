import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { IUser } from '../../interfaces/i-user';
import { HttpClient } from '@angular/common/http';
import { apiPaths } from '../../../config/api';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService<IUser> {

  constructor(http: HttpClient) {
    super(apiPaths.user.api, http)
  }
}
