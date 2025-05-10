import { Component, Input, OnInit } from '@angular/core';
import { IApartmentImages } from '../../../interfaces/i-apartment';
import { ImageType, ImageUrlPipe } from '../../../../shared/helpers/image-url.pipe';
import { config } from '../../../../config/global';

@Component({
    selector: 'app-apartment-view-images',
    templateUrl: './apartment-view-images.component.html',
    styleUrl: './apartment-view-images.component.css',
    standalone: false
})
export class ApartmentViewImagesComponent implements OnInit {

  @Input() images: IApartmentImages[];

  public showModal: boolean = false;
  currentIndex: number = 0;
  imageType = ImageType;

  ngOnInit(): void {
    if (this.images.length > 0) {
      this.images.forEach((image) => {
        switch (image.imageType) {

        case ImageType.Apartment:
            image.path = `${config.apartmentImagesPath}${image.path}`;
            break;

        case ImageType.ApartmentMain:
            image.path = `${config.apartmentMainImagePath}${image.path}`;
            break;
            
        }

      });
    }
  }
  openModal(index: number = 0): void {
    this.currentIndex = index;
    this.showModal = true;
    document.body.classList.add('modal-open');
  }

  nextImage(): void {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    } 
    else {
      this.currentIndex = 0; 
    }
  }

  prevImage(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } 
    else {
      this.currentIndex = this.images.length - 1; 
    }
    
  }

  closeModal(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.showModal = false;
    }
    document.body.classList.remove('modal-open');
  }
}
