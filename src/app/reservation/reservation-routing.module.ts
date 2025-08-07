import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookApartmentComponent } from './components/book-apartment/book-apartment.component';
import { BookingOverviewComponent } from './components/booking-overview/booking-overview.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: ':id', component: BookApartmentComponent},
      {path: 'overview', component: BookingOverviewComponent},
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
