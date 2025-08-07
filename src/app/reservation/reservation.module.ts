import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationRoutingModule } from './reservation-routing.module';
import { BookApartmentComponent } from './components/book-apartment/book-apartment.component';
import { BookingOverviewComponent } from './components/booking-overview/booking-overview.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    BookApartmentComponent,
    BookingOverviewComponent
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    SharedModule
  ]
})
export class ReservationModule { }
