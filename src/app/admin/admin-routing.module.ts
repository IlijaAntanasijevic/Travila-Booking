import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from '../layout/admin-layout/admin-layout.component';
import { PermissionGuard } from '../core/guards/permission.guard';
import { AdminUseCases, AllUseCases } from '../core/consts/use-cases';
import { Permission } from '../core/helpers/utility';
import { AdminApartmentsComponent } from './components/admin-apartments/admin-apartments.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminSettingsComponent } from './components/admin-settings/admin-settings.component';
import { AdminOpenAIComponent } from './components/admin-openai/admin-openai.component';
import { AdminReportsComponent } from './components/admin-reports/admin-reports.component';
import { AdminBookingsComponent } from './components/admin-bookings/admin-bookings.component';
import { AdminRedirectComponent } from './components/admin-redirect/admin-redirect.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [PermissionGuard],
    data: { useCaseId: Permission.getPermissionIds(AdminUseCases) as number[] },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: AdminRedirectComponent
      },
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
        // canActivate: [PermissionGuard],
        // data: {useCaseId: [AdminUseCases.AdminDashboard] }
      },
      {
        path: 'apartments',
        component: AdminApartmentsComponent
      },
      {
        path: 'users',
        component: AdminUsersComponent
      },
      {
        path: 'bookings',
        component: AdminBookingsComponent
      },
      {
        path: 'settings',
        component: AdminSettingsComponent
      },
      {
        path: 'openai',
        component: AdminOpenAIComponent
      },
      {
        path: 'reports',
        component: AdminReportsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
