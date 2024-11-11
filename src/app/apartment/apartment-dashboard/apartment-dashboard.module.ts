import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApartmentDashboardRoutingModule } from './apartment-dashboard-routing.module';
import { ApartmentDashboardOverviewComponent } from './components/apartment-dashboard-overview/apartment-dashboard-overview.component';
import { ApartmentDashboardSearchComponent } from './components/apartment-dashboard-search/apartment-dashboard-search.component';
import { HomeModule } from '../../home/home.module';


@NgModule({
  declarations: [
    ApartmentDashboardOverviewComponent,
    ApartmentDashboardSearchComponent,
  ],
  imports: [
    CommonModule,
    ApartmentDashboardRoutingModule,
    HomeModule
  ]
})
export class ApartmentDashboardModule { }
