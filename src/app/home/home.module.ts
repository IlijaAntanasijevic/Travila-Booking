import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { HomeSeachComponent } from './components/home-seach/home-seach.component';
import { HomeFeaturedApartmentsComponent } from './components/home-featured-apartments/home-featured-apartments.component';
import { HomeTravelStatsComponent } from './components/home-travel-stats/home-travel-stats.component';
import { HomeTestimonialsComponent } from './components/home-testimonials/home-testimonials.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@NgModule({
  declarations: [
    HomeLayoutComponent,
    HomeSeachComponent,
    HomeFeaturedApartmentsComponent,
    HomeTravelStatsComponent,
    HomeTestimonialsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    NgxSkeletonLoaderModule
  ],
  exports: [
    HomeSeachComponent
  ]
})
export class HomeModule { }
