import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/components/layout/layout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "home"
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: "user",
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        canActivate: [AuthGuard]
      },
      {
        path: "apartments",
        loadChildren: () => import('./apartment/apartment.module').then(m => m.ApartmentModule)
      },
      {
        path: "booking",
        loadChildren: () => import('./reservation/reservation.module').then(m => m.ReservationModule),
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: "admin",
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
