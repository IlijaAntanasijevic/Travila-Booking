import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from '../shared/shared.module';
import { ConfirmRegistrationComponent } from './components/confirm-registration/confirm-registration.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ConfirmRegistrationComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
