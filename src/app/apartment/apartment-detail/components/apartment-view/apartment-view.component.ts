import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlApartmentsRequestsService } from '../../../services/requests/bl-apartments-requests.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Spinner } from '../../../../core/functions/spinner';
import { Subscription } from 'rxjs';
import { IApartmenImage, IApartmentDetail, IApartmentImages } from '../../../interfaces/i-apartment';
import { IBase, IPaginatedResponse } from '../../../../core/interfaces/i-base';
import { ILocationCoordinates } from '../../../../shared/components/map/i-map';
import { BlApartmentDashboardDataService } from '../../../apartment-dashboard/services/shared/bl-apartment-dashboard-data.service';
import { ToastrService } from 'ngx-toastr';
import { ISearchHomeRequest } from '../../../../home/components/home-seach/interfaces/i-search-home';
import { MatDialog } from '@angular/material/dialog';
import { ShareDialogComponent, ShareDialogData } from '../../../../shared/components/share-dialog/share-dialog.component';

@Component({
    selector: 'app-apartment-view',
    templateUrl: './apartment-view.component.html',
    styleUrl: './apartment-view.component.css',
    standalone: false
})
export class ApartmentViewComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestsService: BlApartmentsRequestsService,
    private apartmentDashboardDataService: BlApartmentDashboardDataService,
    private alertService: ToastrService,
    private dialog: MatDialog
  ) { }

  private subscription: Subscription = new Subscription();
  apartment: IApartmentDetail;
  images: IApartmentImages[] = [];
  featuresFirstColum: IBase[];
  featuresSecondColum: IBase[];
  selectedCoordinates: ILocationCoordinates = {
    latitude: 0,
    longitude: 0 
  };
  
  openedFromBooking: boolean = false;
  openedFromHome: boolean = false;
  searchedData: ISearchHomeRequest = null;
  private apartmentId: number = null;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = Number(params.get("id"));
      if (isNaN(id)) {
        this.router.navigate(["/404"])
        return;
      }
      this.apartmentId = id;

    })

    this.subscription.add(
     this.route.queryParams.subscribe({
      next: (params) => {
        if(params['from'] == 'booking') {
          this.openedFromBooking = true;
        }
        if(params['from'] == 'home') {
          this.openedFromHome = true;
        }
      }
     })
    )

    this.subscription.add(
      this.apartmentDashboardDataService.searchedData.subscribe({
        next: (data) => {
          if(data) {
            this.searchedData = data;
          }
          this.getApartmentById(this.apartmentId);

        /*
          else if(this.openedFromBooking || this.openedFromHome){
            this.getApartmentById(this.apartmentId);
          }
          else {
            this.router.navigate(["/404"])
            this.alertService.warning("Please select dates and guests before booking.");
          }
        */
        }
      })
    )
  }


  getApartmentById(id: number) {
    Spinner.show();
    this.subscription.add(
      this.requestsService.getOne(id).subscribe({
        next: (data) => {
          this.apartment = data;
          this.apartment.country = data?.country?.name;
          this.apartment.city = data?.city?.name;
          console.log(this.apartment);
          
          this.images.push({
            path: data.mainImage.fileName,
            id: 0,
            imageType: data.mainImage.imageType
          });
          data?.images.forEach((x: IApartmenImage, index: number) => {
            this.images.push({ path: x.fileName, id: ++index, imageType: x.imageType });
          })

          this.selectedCoordinates.latitude = this.apartment.lattitude;
          this.selectedCoordinates.longitude = this.apartment.longitude;

          let divideFeatures = Math.ceil(data.features.length / 2);
          this.featuresFirstColum = data.features.slice(0, divideFeatures);
          this.featuresSecondColum = data.features.slice(divideFeatures);

          if(!this.openedFromBooking && !this.openedFromHome){
            this.isApartmentAvailable();

          }
          Spinner.hide();
        },
        error: (err) => {
          if (err?.message?.includes('Not Found.')) {
            this.router.navigate(["/404"])
          }
          Spinner.hide();

        }
      })
    )
  }

  addToFavorite(): void {
    this.requestsService.addToFavorite(this.apartmentId).subscribe({
      next: (data) => {
        if(this.apartment.isFavorite) {
          this.alertService.warning("Apartment removed from favorites");
          this.apartment.isFavorite = false;
        }
        else {
          this.alertService.success("Apartment added to favorites");
          this.apartment.isFavorite = true;
        }
        
      },
      error: (error) => {

      }
    })
  }

  isApartmentAvailable(): void {
    this.subscription.add(
      this.apartmentDashboardDataService.isApartmentAvailable.subscribe({
        next: (data) => {
          if (data != null) {
            if(data){
              this.apartment.isAvailable = data;
            }
            else {
              this.alertService.warning("This apartment is not available for booking.");
            }
          } 
        }
      })
    )
  }

  redirectToBooking(): void {
    this.subscription.add(
      this.apartmentDashboardDataService.searchedData.subscribe({
        next: (data) => {
          if(!data){
            this.alertService.warning("Please select dates and guests before booking.");
            return;
          }
          else {
              this.router.navigateByUrl(`/booking/${this.apartment.id}`);
          }
        }
      })
    )
  }

  openShareDialog(): void {
    if (!this.apartment) return;

    const shareData: ShareDialogData = {
      title: this.apartment.name,
      description: `Check out this amazing apartment: ${this.apartment.name} in ${this.apartment.city}, ${this.apartment.country}`,
      url: window.location.href,
      apartmentId: this.apartment.id
    };

    this.dialog.open(ShareDialogComponent, {
      data: shareData,
      width: '500px',
      maxWidth: '90vw',
      panelClass: 'share-dialog-panel'
    });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
