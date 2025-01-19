import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserOverviewDialogComponent } from './components/user-overview-dialog/user-overview-dialog.component';
import { CalendarComponent } from './components/user-overview-dialog/calendar-component/calendar/calendar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FavoriteApartmentsComponent } from './components/favorite-apartments/favorite-apartments.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ReservationsComponent } from './components/reservations/reservations.component';

const routes: Routes = [
  {
    path: "",
    component: CalendarComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "favorite",
    component: FavoriteApartmentsComponent
  },
  {
    path: "messages",
    component: MessagesComponent
  },
  {
    path: "reservations",
    component: ReservationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
