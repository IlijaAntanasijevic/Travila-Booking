import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PermissionGuard } from '../core/guards/permission.guard';
import { AdminUseCases } from '../core/consts/use-cases';
import { Permission } from '../core/helpers/utility';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    canActivate: [PermissionGuard],
    data: { useCaseId: Permission.getPermissionIds(AdminUseCases) as number[] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
