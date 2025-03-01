import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlHomeFeaturedApartmentsRequestsService } from './services/requests/bl-home-featured-apartments-requests.service';
import { IApartment } from '../../../apartment/interfaces/i-apartment';
import { Subscription } from 'rxjs';
import { IPaginatedResponse } from '../../../core/interfaces/i-base';
import { Spinner } from '../../../core/functions/spinner';
import { AuthService } from '../../../auth/services/shared/auth.service';
import { BlFavoriteApartmentsRequestsService } from '../../../user/components/favorite-apartments/services/requests/bl-favorite-apartments-requests.service';

@Component({
  selector: 'app-home-featured-apartments',
  templateUrl: './home-featured-apartments.component.html',
  styleUrl: './home-featured-apartments.component.css'
})
export class HomeFeaturedApartmentsComponent implements OnInit, OnDestroy {

  constructor(
    private homeFeaturedRequestsService: BlHomeFeaturedApartmentsRequestsService,
    private favoriteApartmentsRequestService: BlFavoriteApartmentsRequestsService,
    private authService: AuthService
  ) { }

  page: number = 1;
  apartmemts: IApartment[];
  data: IPaginatedResponse<IApartment> = null;
  isLoggedIn: boolean = this.authService.isLoggedIn();

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
          this.page == 1 ? this.apartmemts = this.data.data : this.apartmemts = [...this.apartmemts, ...data.data];
          // setTimeout(() => {
          //   this.page == 1 ? this.apartmemts = this.data.data : this.apartmemts = [...this.apartmemts, ...data.data];
          // }, 3000)
          Spinner.hide();
        },
        error: (err) => {
          Spinner.hide();
        }
      })
    )
  }

  addToWishList(apartmentId: number): void {
    this.favoriteApartmentsRequestService.addToFavorite(apartmentId).subscribe({
      next: (data) => {

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
