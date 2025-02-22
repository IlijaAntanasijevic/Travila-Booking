import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserOverviewDialogComponent } from './components/user-overview-dialog/user-overview-dialog.component';
import { CalendarDateFormatter, CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './components/user-overview-dialog/calendar-component/calendar/calendar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FavoriteApartmentsComponent } from './components/favorite-apartments/favorite-apartments.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { UserTabsComponent } from './components/user-tabs/user-tabs.component';
import { ReservationInfoDialogComponent } from './components/reservations/components/reservation-info-dialog/reservation-info-dialog.component';

@NgModule({
  declarations: [
    UserOverviewDialogComponent,
    CalendarComponent,
    ProfileComponent,
    FavoriteApartmentsComponent,
    MessagesComponent,
    ReservationsComponent,
    UserTabsComponent,
    ReservationInfoDialogComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  exports: [
    UserTabsComponent
  ],
  providers: [
    CalendarDateFormatter
  ]
})
export class UserModule { }
