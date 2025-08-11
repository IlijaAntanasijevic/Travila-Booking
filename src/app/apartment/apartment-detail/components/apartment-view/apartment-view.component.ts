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
    private alertService: ToastrService
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


  public TMPPaginatorData: IPaginatedResponse<any> = {
    "data": [],
    "perPage": 3,
    "totalCount": 9,
    "pages": 3,
    "currentPage": 1
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get("id"));
      if (isNaN(id)) {
        this.router.navigate(["/404"])
        return;
      }

      this.getApartmentById(id);

    })

    this.subscription.add(
     this.route.queryParams.subscribe({
      next: (params) => {
        if(params['from'] == 'booking') {
          this.openedFromBooking = true;
        }
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

          this.isApartmentAvailable();
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

  isApartmentAvailable(): void {
    this.subscription.add(
      this.apartmentDashboardDataService.isApartmentAvailable.subscribe({
        next: (data) => {
          if (data) {
            this.apartment.isAvailable = data;
          } else {
            this.alertService.warning("This apartment is not available for booking.");
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


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
