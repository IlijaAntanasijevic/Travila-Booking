import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from '../layout/admin-layout/admin-layout.component';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminApartmentsComponent } from './components/admin-apartments/admin-apartments.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminBookingsComponent } from './components/admin-bookings/admin-bookings.component';
import { AdminSettingsComponent } from './components/admin-settings/admin-settings.component';
import { AdminReportsComponent } from './components/admin-reports/admin-reports.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminDashboardComponent,
    AdminApartmentsComponent,
    AdminUsersComponent,
    AdminBookingsComponent,
    AdminSettingsComponent,
    AdminReportsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
