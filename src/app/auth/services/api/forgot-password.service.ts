import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { apiPaths } from '../../../config/api';

@Injectable({ providedIn: 'root' })
export class ForgotPasswordService extends ApiService<any> {

  constructor(http: HttpClient) {
    super(apiPaths.auth.forgotPassword, http)
  }

}
