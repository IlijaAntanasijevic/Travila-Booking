import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserApartmentDashboardComponent } from './components/user-apartment-dashboard/user-apartment-dashboard.component';
import { AddEditApartmentComponent } from './components/add-edit-apartment/add-edit-apartment.component';
import { UserArchivedApartmentsComponent } from './components/user-archived-apartments/user-archived-apartments.component';

const routes: Routes = [
  {
    path: "",
    component: UserApartmentDashboardComponent,
  },
  {
    path: "add",
    component: AddEditApartmentComponent
  },
  {
    path: "edit/:id",
    component: AddEditApartmentComponent,
    pathMatch: "full"
  },
    {
    path: "archived",
    component: UserArchivedApartmentsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserApartmentRoutingModule { }
