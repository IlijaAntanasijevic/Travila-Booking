import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { HomeSeachComponent } from './components/home-seach/home-seach.component';
import { HomeFeaturedApartmentsComponent } from './components/home-featured-apartments/home-featured-apartments.component';
import { PopularDestinationsComponent } from './components/popular-destinations/popular-destinations.component';
import { HomeFlightsComponent } from './components/home-flights/home-flights.component';


@NgModule({
  declarations: [
    HomeLayoutComponent,
    HomeSeachComponent,
    HomeFeaturedApartmentsComponent,
    PopularDestinationsComponent,
    HomeFlightsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
