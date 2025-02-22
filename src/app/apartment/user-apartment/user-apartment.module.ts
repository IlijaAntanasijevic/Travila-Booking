import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserApartmentRoutingModule } from './user-apartment-routing.module';
import { UserApartmentDashboardComponent } from './components/user-apartment-dashboard/user-apartment-dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { UserModule } from '../../user/user.module';
import { AddEditApartmentComponent } from './components/add-edit-apartment/add-edit-apartment.component';
import { NgxSummernoteModule } from 'ngx-summernote';

@NgModule({
  declarations: [
    UserApartmentDashboardComponent,
    AddEditApartmentComponent
  ],
  imports: [
    CommonModule,
    UserApartmentRoutingModule,
    SharedModule,
    UserModule,
    NgxSummernoteModule
  ]
})
export class UserApartmentModule { }
