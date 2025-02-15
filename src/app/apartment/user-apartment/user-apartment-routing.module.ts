import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserApartmentDashboardComponent } from './components/user-apartment-dashboard/user-apartment-dashboard.component';

const routes: Routes = [
  {
    path: "",
    component: UserApartmentDashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserApartmentRoutingModule { }
