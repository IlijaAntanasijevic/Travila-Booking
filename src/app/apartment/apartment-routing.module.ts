import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { numberIdMatcher } from '../core/helpers/utility';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./apartment-dashboard/apartment-dashboard.module').then(m => m.ApartmentDashboardModule)
  },
  {
    // path: ":id",
    matcher: numberIdMatcher,
    loadChildren: () => import('./apartment-detail/apartment-detail.module').then(m => m.ApartmentDetailModule)
  },
  {
    path: "user",
    loadChildren: () => import('./user-apartment/user-apartment.module').then(m => m.UserApartmentModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApartmentRoutingModule { }
