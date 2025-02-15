import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserApartmentRoutingModule } from './user-apartment-routing.module';
import { UserApartmentDashboardComponent } from './components/user-apartment-dashboard/user-apartment-dashboard.component';
import { AddUserApartmentComponent } from './components/add-user-apartment/add-user-apartment.component';
import { SharedModule } from '../../shared/shared.module';
import { UserModule } from '../../user/user.module';

@NgModule({
  declarations: [
    UserApartmentDashboardComponent,
    AddUserApartmentComponent
  ],
  imports: [
    CommonModule,
    UserApartmentRoutingModule,
    SharedModule,
    UserModule,
  ]
})
export class UserApartmentModule { }
