import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { IConfirmEmail } from '../../interfaces/i-auth';
import { HttpClient } from '@angular/common/http';
import { apiPaths } from '../../../config/api';

@Injectable({
  providedIn: 'root'
})
export class ConfirmEmailService extends ApiService<IConfirmEmail>{

  constructor(http: HttpClient) {
    super(apiPaths.auth.confirm, http)
  }

}
