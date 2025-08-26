import { Injectable } from '@angular/core';
import { apiPaths } from '../../../config/api';
import { ApiService } from '../../../core/services/api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService extends ApiService<any> {

  constructor(http: HttpClient) {
    super(apiPaths.auth.changePassword, http)
  }
}
