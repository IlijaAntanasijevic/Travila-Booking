import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApartmentDetailRoutingModule } from './apartment-detail-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ApartmentViewComponent } from './components/apartment-view/apartment-view.component';
import { ApartmentViewImagesComponent } from './components/apartment-view-images/apartment-view-images.component';
import { ApartmentAddReviewComponent } from './components/apartment-add-review/apartment-add-review.component';
import { ApartmentRatingComponent } from './components/apartment-rating/apartment-rating.component';

@NgModule({
  declarations: [
    ApartmentViewComponent,
    ApartmentViewImagesComponent,
    ApartmentAddReviewComponent,
    ApartmentRatingComponent
  ],
  imports: [
    CommonModule,
    ApartmentDetailRoutingModule,
    SharedModule
  ]
})
export class ApartmentDetailModule { }
