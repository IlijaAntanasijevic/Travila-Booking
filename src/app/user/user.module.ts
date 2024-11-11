import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UserOverviewDialogComponent } from './components/user-overview-dialog/user-overview-dialog.component';
import { CalendarDateFormatter, CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './components/user-overview-dialog/calendar-component/calendar/calendar.component';

@NgModule({
  declarations: [
    UserOverviewDialogComponent,
    CalendarComponent
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
  providers: [
    CalendarDateFormatter
  ]
})
export class UserModule { }
