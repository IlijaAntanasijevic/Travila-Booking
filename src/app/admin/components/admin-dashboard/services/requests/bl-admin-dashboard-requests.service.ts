import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminDashboardService } from '../api/admin-dashboard.service';
import { IAdminDashboardDto } from '../interfaces/admin-dashboard';

@Injectable({
  providedIn: 'root'
})
export class BlAdminDashboardRequestsService {

  constructor(
    private apiService: AdminDashboardService
  ) { }

  getAdminData(): Observable<IAdminDashboardDto> {
    return this.apiService.getAllObject();
  }
}
