import { Injectable } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';
import { IAdminUser } from '../interface/i-admin-users';
import { HttpClient } from '@angular/common/http';
import { apiPaths } from '../../../../../config/api';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService extends ApiService<IAdminUser>{

  constructor(http: HttpClient) {
    super(apiPaths.admin.allUsers, http)
   }
}
