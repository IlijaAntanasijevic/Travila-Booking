import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApartmentDashboardRoutingModule } from './apartment-dashboard-routing.module';
import { ApartmentDashboardOverviewComponent } from './components/apartment-dashboard-overview/apartment-dashboard-overview.component';
import { ApartmentDashboardSearchComponent } from './components/apartment-dashboard-search/apartment-dashboard-search.component';
import { HomeModule } from '../../home/home.module';
import { SharedModule } from '../../shared/shared.module';
import { ApartmentDashboardFilterComponent } from './components/apartment-dashboard-filter/apartment-dashboard-filter.component';
import { ApartmentDashboardGridComponent } from './components/apartment-dashboard-grid/apartment-dashboard-grid.component';
import { ApartmentDashboardListComponent } from './components/apartment-dashboard-list/apartment-dashboard-list.component';
import { ApartmentDashboardSortComponent } from './components/apartment-dashboard-sort/apartment-dashboard-sort.component';

@NgModule({
  declarations: [
    ApartmentDashboardOverviewComponent,
    ApartmentDashboardSearchComponent,
    ApartmentDashboardFilterComponent,
    ApartmentDashboardGridComponent,
    ApartmentDashboardListComponent,
    ApartmentDashboardSortComponent,
  ],
  imports: [
    CommonModule,
    ApartmentDashboardRoutingModule,
    HomeModule,
    SharedModule
  ]
})
export class ApartmentDashboardModule { }
