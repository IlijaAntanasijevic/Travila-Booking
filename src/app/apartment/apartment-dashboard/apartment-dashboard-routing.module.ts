import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApartmentDashboardOverviewComponent } from './components/apartment-dashboard-overview/apartment-dashboard-overview.component';

const routes: Routes = [
  {
    path: "",
    component: ApartmentDashboardOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApartmentDashboardRoutingModule { }
