import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationRoutingModule } from './reservation-routing.module';
import { BookApartmentComponent } from './components/book-apartment/book-apartment.component';
import { BookingOverviewComponent } from './components/booking-overview/booking-overview.component';


@NgModule({
  declarations: [
    BookApartmentComponent,
    BookingOverviewComponent
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule
  ]
})
export class ReservationModule { }
