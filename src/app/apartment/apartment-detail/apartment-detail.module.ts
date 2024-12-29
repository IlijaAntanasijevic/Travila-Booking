import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApartmentDetailRoutingModule } from './apartment-detail-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ApartmentViewComponent } from './components/apartment-view/apartment-view.component';
import { ApartmentViewImagesComponent } from './components/apartment-view-images/apartment-view-images.component';
import { GalleryModule } from '@ks89/angular-modal-gallery';
@NgModule({
  declarations: [
    ApartmentViewComponent,
    ApartmentViewImagesComponent
  ],
  imports: [
    CommonModule,
    ApartmentDetailRoutingModule,
    SharedModule,
    GalleryModule
  ]
})
export class ApartmentDetailModule { }
