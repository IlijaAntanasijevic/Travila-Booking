import { Component, Input, OnInit } from '@angular/core';
import { Image, ModalGalleryConfig, ModalGalleryRef, ModalGalleryService } from '@ks89/angular-modal-gallery';

@Component({
  selector: 'app-apartment-view-images',
  templateUrl: './apartment-view-images.component.html',
  styleUrl: './apartment-view-images.component.css'
})
export class ApartmentViewImagesComponent implements OnInit{

  constructor(
    private modalGalleryService: ModalGalleryService
  ) {}

  //@Input() images: Image[];

  private images: Image[]


  ngOnInit(): void {
      this.images = [
        {
          id: 1,
          modal: {
            img: "http://localhost:5000/apartments\\images\\370308ee-0968-4579-956a-c1016c26fb50.jpg"
          }
        } as Image
      ]
  }

  openModal(): void {
    console.log(this.images);
    
    const dialogRef: ModalGalleryRef = this.modalGalleryService.open({
      id: 1,
      images: this.images,
      currentImage: this.images[0],
    } as ModalGalleryConfig) as ModalGalleryRef;
  }
}
