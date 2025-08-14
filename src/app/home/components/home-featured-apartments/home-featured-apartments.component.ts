import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlHomeFeaturedApartmentsRequestsService } from './services/requests/bl-home-featured-apartments-requests.service';
import { IApartment } from '../../../apartment/interfaces/i-apartment';
import { Subscription } from 'rxjs';
import { IPaginatedResponse } from '../../../core/interfaces/i-base';
import { Spinner } from '../../../core/functions/spinner';
import { AuthService } from '../../../auth/services/shared/auth.service';
import { ImageType } from '../../../shared/helpers/image-url.pipe';
import { BlApartmentDashboardDataService } from '../../../apartment/apartment-dashboard/services/shared/bl-apartment-dashboard-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-home-featured-apartments',
    templateUrl: './home-featured-apartments.component.html',
    styleUrl: './home-featured-apartments.component.css',
    standalone: false
})
export class HomeFeaturedApartmentsComponent implements OnInit, OnDestroy {

  constructor(
    private homeFeaturedRequestsService: BlHomeFeaturedApartmentsRequestsService,
    private authService: AuthService,
    private apartmentDashboardDataService: BlApartmentDashboardDataService,
    private alertService: ToastrService
  ) { }

  page: number = 1;
  apartmemts: IApartment[];
  data: IPaginatedResponse<IApartment> = null;
  isLoggedIn: boolean = this.authService.isLoggedIn();
  imageType = ImageType;
  favoriteApartmentIds: Set<number> = new Set();
  private subscription: Subscription = new Subscription();


  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    Spinner.show();
    this.subscription.add(
      this.homeFeaturedRequestsService.getFeatured(this.page).subscribe({
        next: (data) => {
          this.data = data;
          this.favoriteApartmentIds = new Set(this.data.data.filter(apartment => apartment.isFavorite).map(apartment => apartment.id));
          // this.page == 1 ? this.apartmemts = this.data.data : this.apartmemts = [...this.apartmemts, ...data.data];
          setTimeout(() => {
            this.page == 1 ? this.apartmemts = this.data.data : this.apartmemts = [...this.apartmemts, ...data.data];
          }, 3000)
          Spinner.hide();
        },
        error: (err) => {
          Spinner.hide();
        }
      })
    )
  }

  addToFavorite(apartmentId: number): void {
    this.homeFeaturedRequestsService.addToFavorite(apartmentId).subscribe({
      next: (data) => {
        if( this.favoriteApartmentIds.has(apartmentId)) {
          this.favoriteApartmentIds.delete(apartmentId);
          this.alertService.warning("Apartment removed from favorites");
        }
        else {
          this.favoriteApartmentIds.add(apartmentId);
          this.alertService.success("Apartment added to favorites");
        }
        
      },
      error: (error) => {

      }
    })
  }
  viewMore(): void {
    this.page++;
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
