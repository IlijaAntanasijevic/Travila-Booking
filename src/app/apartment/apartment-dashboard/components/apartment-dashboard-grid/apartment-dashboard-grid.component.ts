import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IPaginatedResponse } from '../../../../core/interfaces/i-base';
import { IApartment } from '../../../interfaces/i-apartment';
import { BlApartmentDashboardDataService } from '../../services/shared/bl-apartment-dashboard-data.service';
import { AuthService } from '../../../../auth/services/shared/auth.service';
import { BlFavoriteApartmentsRequestsService } from '../../../../user/components/favorite-apartments/services/requests/bl-favorite-apartments-requests.service';
import { ImageType } from '../../../../shared/helpers/image-url.pipe';
import { Router } from '@angular/router';

@Component({
    selector: 'app-apartment-dashboard-grid',
    templateUrl: './apartment-dashboard-grid.component.html',
    styleUrl: './apartment-dashboard-grid.component.css',
    standalone: false
})
export class ApartmentDashboardGridComponent implements OnChanges {

  constructor(
    private dataService: BlApartmentDashboardDataService,
    private favoriteApartmentsRequestService: BlFavoriteApartmentsRequestsService,
    private authService: AuthService,
    private router: Router,
  ) { }

  @Input() data: IPaginatedResponse<IApartment>;
  public apartmentsData: IApartment[] = [];
  imageType = ImageType;
  isLoggedIn: boolean = this.authService.isLoggedIn();


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.apartmentsData = this.data.data;
    }
  }

  addToWishList(apartmentId: number): void {
    this.favoriteApartmentsRequestService.addToFavorite(apartmentId).subscribe({
      next: (data) => {

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
