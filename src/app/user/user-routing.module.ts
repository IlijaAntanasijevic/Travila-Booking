import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UserOverviewDialogComponent } from './components/user-overview-dialog/user-overview-dialog.component';
import { CalendarComponent } from './components/user-overview-dialog/calendar-component/calendar/calendar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FavoriteApartmentsComponent } from './components/favorite-apartments/favorite-apartments.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { UserTabsComponent } from './components/user-tabs/user-tabs.component';
import { PermissionGuard } from '../core/guards/permission.guard';
import { AllUseCases, UserUseCases } from '../core/consts/use-cases';

const routes: Routes = [
  {
    path: '',
    component: UserTabsComponent,
    children: [
      { 
        path: 'profile', 
        component: ProfileComponent, 
        canActivate: [PermissionGuard],
        data: { useCaseId: [AllUseCases.UpdateUser, AllUseCases.GetUser]}
      },
      { 
        path: 'favorite', 
        component: FavoriteApartmentsComponent,
        canActivate: [PermissionGuard],
        data: { useCaseId: [AllUseCases.GetFavoriteApartments] }
      },
      { 
        path: 'messages', 
        component: MessagesComponent,
        canActivate: [PermissionGuard],
        data: { useCaseId: [AllUseCases.GetUserChatList] }

      },
      { 
        path: 'reservations', 
        component: ReservationsComponent,
        canActivate: [PermissionGuard],
        data: { useCaseId: [AllUseCases.GetMyBookings, AllUseCases.GetMyGyestBookings] }

      },
      { 
        path: '', redirectTo: 'profile', pathMatch: 'full' 
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
