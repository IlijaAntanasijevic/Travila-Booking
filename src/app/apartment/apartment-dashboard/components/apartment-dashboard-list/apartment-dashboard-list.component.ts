import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IApartment } from '../../../interfaces/i-apartment';
import { IPaginatedResponse } from '../../../../core/interfaces/i-base';
import { BlApartmentDashboardDataService } from '../../services/shared/bl-apartment-dashboard-data.service';
import { AuthService } from '../../../../auth/services/shared/auth.service';
import { BlFavoriteApartmentsRequestsService } from '../../../../user/components/favorite-apartments/services/requests/bl-favorite-apartments-requests.service';
import { IMAGE_TYPE } from '../../../../shared/helpers/image-url.pipe';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-apartment-dashboard-list',
    templateUrl: './apartment-dashboard-list.component.html',
    styleUrl: './apartment-dashboard-list.component.css',
    standalone: false
})
export class ApartmentDashboardListComponent implements OnChanges {

  constructor(
    private dataService: BlApartmentDashboardDataService,
    private favoriteApartmentsRequestService: BlFavoriteApartmentsRequestsService,
    private authService: AuthService,
    private router: Router,
    private alertService: ToastrService
  ) { }

  @Input() data: IPaginatedResponse<IApartment>;
  public apartmentsData: IApartment[] = [];
  isLoggedIn: boolean = this.authService.isLoggedIn();
  imageType = IMAGE_TYPE;
  favoriteApartmentIds: Set<number> = new Set();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.apartmentsData = this.data.data;
      this.favoriteApartmentIds = new Set(this.apartmentsData.filter(apartment => apartment.isFavorite).map(apartment => apartment.id));
    }
  }

  addToFavorite(apartmentId: number): void {
    this.favoriteApartmentsRequestService.addToFavorite(apartmentId).subscribe({
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

  viewApartmentDetails(apartment: IApartment): void {
    this.dataService.isApartmentAvailable.next(apartment.isAvailable);
    this.router.navigate(['/apartments/' + apartment.id]);

  }

  onPageChange(page: number): void {
    this.dataService.pageChanged.next(page);
  }

}
