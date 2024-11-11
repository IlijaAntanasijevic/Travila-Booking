import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserOverviewDialogComponent } from './components/user-overview-dialog/user-overview-dialog.component';
import { CalendarComponent } from './components/user-overview-dialog/calendar-component/calendar/calendar.component';

const routes: Routes = [
  {
    path: "",
    component: CalendarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
