import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IMAGE_TYPE } from '../../../../shared/helpers/image-url.pipe';
import { ApartmentStatus, IAdminApartments } from '../services/interfaces/i-admin-apartments';
import { IApartmentDetail } from '../../../../apartment/interfaces/i-apartment';
import { Subscription } from 'rxjs';
import { BlAdminApartmentsRequestsService } from '../services/requests/bl-admin-apartments-requests.service';
import { Spinner } from '../../../../core/functions/spinner';
import { IBase } from '../../../../core/interfaces/i-base';
import { ILocationCoordinates } from '../../../../shared/components/map/i-map';

@Component({
  selector: 'app-apartment-details-dialog',
  standalone: false,
  templateUrl: './apartment-details-dialog.component.html',
  styleUrl: './apartment-details-dialog.component.css'
})
export class ApartmentDetailsDialogComponent implements OnInit, OnDestroy {

  constructor(
    public dialogRef: MatDialogRef<ApartmentDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public apartmentData: { apartmentId: number, ownerFullName: string},
    private requestsService: BlAdminApartmentsRequestsService
  ) {}

  //data: IApartmentDetail;
  data: any;
  phoneNumber: string;
  email: string;
  featuresFirstColum: IBase[];
  featuresSecondColum: IBase[];
  selectedCoordinates: ILocationCoordinates = {
    latitude: 0,
    longitude: 0 
  };

  imageType = IMAGE_TYPE;
  apartmentStatus = ApartmentStatus;
  private subscription: Subscription = new Subscription();

  
  ngOnInit(): void {
    this.getApartmentData();    
  }

  getApartmentData(): void {
    Spinner.show();
    this.subscription.add(
      this.requestsService.getApartmentDetails(this.apartmentData.apartmentId).subscribe({
        next: (data) => {
          Spinner.hide();
          this.data = data;
          let divideFeatures = Math.ceil(data.features.length / 2);
          this.featuresFirstColum = data.features.slice(0, divideFeatures);
          this.featuresSecondColum = data.features.slice(divideFeatures);

          this.selectedCoordinates.latitude = data.lattitude
          this.selectedCoordinates.longitude = data.longitude

          this.getUserData(data.userId);
          
        },
        error: err => Spinner.hide()
      })
    )
  }

  getUserData(userId: number): void {
    this.subscription.add(
      this.requestsService.getUserById(userId).subscribe({
        next: (data) => {
          this.email = data.email;
          this.phoneNumber = data.phone;
        },
        error: err => {}
      })
    )
  }

  approveApartment(): void {
    alert("APPROVED:" + this.apartmentData.apartmentId)
    //this.dialogRef.close('approved');
  }

  rejectApartment(): void {
    alert("REJECT" + + this.apartmentData.apartmentId)
    //this.dialogRef.close('rejected');
  }

  getStars(rating: number): string[] {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('star');
    }
    
    if (hasHalfStar) {
      stars.push('star_half');
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push('star_border');
    }
    
    return stars;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
