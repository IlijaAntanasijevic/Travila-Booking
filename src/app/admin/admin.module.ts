import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from '../layout/admin-layout/admin-layout.component';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminApartmentsComponent } from './components/admin-apartments/admin-apartments.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminBookingsComponent } from './components/admin-bookings/admin-bookings.component';
import { AdminSettingsComponent } from './components/admin-settings/admin-settings.component';
import { AdminOpenAIComponent } from './components/admin-openai/admin-openai.component';
import { AdminReportsComponent } from './components/admin-reports/admin-reports.component';
import { ApartmentDetailsDialogComponent } from './components/admin-apartments/apartment-details-dialog/apartment-details-dialog.component';
import { EditUserUseCasesDialogComponent } from './components/admin-users/edit-user-usecases-dialog/edit-user-usecases-dialog.component';
import { AdminRedirectComponent } from './components/admin-redirect/admin-redirect.component';
import { BookingDetailsDialogComponent } from './components/admin-bookings/booking-details-dialog/booking-details-dialog.component';
import { AddPaymentMethodDialogComponent } from './components/admin-settings/dialogs/add-payment-method-dialog/add-payment-method-dialog.component';
import { AddCityDialogComponent } from './components/admin-settings/dialogs/add-city-dialog/add-city-dialog.component';
import { AddApartmentTypeDialogComponent } from './components/admin-settings/dialogs/add-apartment-type-dialog/add-apartment-type-dialog.component';
import { AddApartmentFeatureDialogComponent } from './components/admin-settings/dialogs/add-apartment-feature-dialog/add-apartment-feature-dialog.component';
import { UseCaseDetailsDialogComponent } from './components/admin-reports/dialogs/use-case-details-dialog/use-case-details-dialog.component';
import { ErrorDetailsDialogComponent } from './components/admin-reports/dialogs/error-details-dialog/error-details-dialog.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminDashboardComponent,
    AdminApartmentsComponent,
    AdminUsersComponent,
    AdminBookingsComponent,
    AdminSettingsComponent,
    AdminOpenAIComponent,
    AdminReportsComponent,
    ApartmentDetailsDialogComponent,
    EditUserUseCasesDialogComponent,
    AdminRedirectComponent,
    BookingDetailsDialogComponent,
    AddPaymentMethodDialogComponent,
    AddCityDialogComponent,
    AddApartmentTypeDialogComponent,
    AddApartmentFeatureDialogComponent,
    UseCaseDetailsDialogComponent,
    ErrorDetailsDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ]
})
export class AdminModule { }
