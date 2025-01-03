import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./apartment-dashboard/apartment-dashboard.module').then(m => m.ApartmentDashboardModule)
  },
  {
    path: ":id",
    loadChildren: () => import('./apartment-detail/apartment-detail.module').then(m => m.ApartmentDetailModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApartmentRoutingModule { }
