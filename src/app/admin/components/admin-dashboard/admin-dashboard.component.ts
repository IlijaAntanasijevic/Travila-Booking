import { Component, OnDestroy, OnInit } from '@angular/core';
import { PermissionService } from '../../../core/services/permission.service';
import { BlAdminDashboardRequestsService } from './services/requests/bl-admin-dashboard-requests.service';
import { IAdminDashboardDto } from './services/interfaces/admin-dashboard';
import { Subscription } from 'rxjs';
import { Spinner } from '../../../core/functions/spinner';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
  standalone: false
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  constructor(
    private permissionService: PermissionService,
    private requestsService: BlAdminDashboardRequestsService
  ) { }

  data: IAdminDashboardDto = null;
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    Spinner.show();
    this.subscription.add(
      this.requestsService.getAdminData().subscribe({
        next: (data) => {
          this.data = data;
          Spinner.hide();
        },
        error: err => Spinner.hide()
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getStatusLabelBookings(status: number): string {
    if (status === 1) { return 'Upcoming'; }
    if (status === 2) { return 'Completed'; }
    return 'Canceled';
  }

  getStatusLabelApartments(status: number): string {
    if (status === 1) { return 'Active'; }
    if (status === 2) { return 'Deleted'; }
    return 'Archived';
  }

  getStatusClass(status: number, isApartment = false): string {
    if (status === 1) { return 'badge-success'; }
    if (status === 2 && !isApartment) { return 'badge-warning'; }
    if (status === 2 && isApartment) { return 'badge-danger'; }
    if (status === 3 && isApartment) { return 'badge-warning'; }
    if (status === 3 && !isApartment) { return 'badge-danger'; }
    return 'badge-warning';
  }


}
