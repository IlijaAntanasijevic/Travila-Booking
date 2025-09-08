import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiPaths } from '../../../../../config/api';
import { ApiService } from '../../../../../core/services/api.service';
import { IAdminDashboardDto } from '../interfaces/admin-dashboard';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService extends ApiService<IAdminDashboardDto>{

  constructor(http: HttpClient) {
    super(apiPaths.admin.dashboard, http)
   }
}
