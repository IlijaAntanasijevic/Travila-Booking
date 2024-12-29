import { Component, Input } from '@angular/core';
import { IApartmentImages } from '../../../interfaces/i-apartment';

@Component({
  selector: 'app-apartment-view-images',
  templateUrl: './apartment-view-images.component.html',
  styleUrl: './apartment-view-images.component.css'
})
export class ApartmentViewImagesComponent{

  @Input() images: IApartmentImages[];

  public showModal: boolean = false;
  currentIndex: number = 0;

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
