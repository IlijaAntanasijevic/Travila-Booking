import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { HomeSeachComponent } from './components/home-seach/home-seach.component';


@NgModule({
  declarations: [
    HomeLayoutComponent,
    HomeSeachComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
