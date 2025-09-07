import { Injectable } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { IAdminDashboardDto } from '../interfaces/admin-dashboard';
import { apiPaths } from '../../../../config/api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService extends ApiService<IAdminDashboardDto>{

  constructor(http: HttpClient) {
    super(apiPaths.admin.dashboard, http)
   }
}
