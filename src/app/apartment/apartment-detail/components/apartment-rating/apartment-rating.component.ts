import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IApartmentDetail } from '../../../interfaces/i-apartment';
import { IDefaultPagination, IPaginatedResponse } from '../../../../core/interfaces/i-base';
import { RATING_CATEGORY } from '../apartment-add-review/enums/review-category';
import { BlApartmentReviewRequestsService } from '../apartment-add-review/services/requests/bl-apartment-review-requests.service';
import { Spinner } from '../../../../core/functions/spinner';
import { IUserRatings } from '../apartment-add-review/interfaces/i-apartment-review';
import { Subscription } from 'rxjs';
import { IMAGE_TYPE } from '../../../../shared/helpers/image-url.pipe';

@Component({
  selector: 'app-apartment-rating',
  standalone: false,
  templateUrl: './apartment-rating.component.html',
  styleUrl: './apartment-rating.component.css'
})
export class ApartmentRatingComponent implements OnInit, OnDestroy {

  constructor(
    private requestsService: BlApartmentReviewRequestsService
  ) { }

  @Input('apartment') apartment: IApartmentDetail;
  @Input('openedFromBooking') openedFromBooking: boolean;

  reviewProgressData: any[] = [];
  userRatings: IPaginatedResponse<IUserRatings>;
  subscription: Subscription = new Subscription()
  imageType = IMAGE_TYPE;
  ratingCategoryMap: { [key: number]: string } = {
    1: RATING_CATEGORY.Price,
    2: RATING_CATEGORY.Service,
    3: RATING_CATEGORY.Safety,
    4: RATING_CATEGORY.Entertainment,
    5: RATING_CATEGORY.Accessibility,
    6: RATING_CATEGORY.Support
  };

  private params: IDefaultPagination = {
    perPage: 9,
    page: 1
  }

  ngOnInit(): void {
    this.reviewProgressData = this.apartment.ratingInfo.ratingStatistic.map(x => {
      return {
        label: this.ratingCategoryMap[x.id],
        value: x.value
      }
    });

    this.getUserRatingData();

  }

  getUserRatingData(): void {
    Spinner.show();
    this.subscription.add(
    this.requestsService.getRatings(this.params, this.apartment.id).subscribe({
      next: (data) => {
        this.userRatings = data;
        console.log(this.userRatings);
        Spinner.hide();
        
      },
      error: (err) => {
        Spinner.hide();
      }
    })
    )
  }

  getStarArray(avgRating: number): ('full' | 'half' | 'empty')[] {
    let stars: ('full' | 'half' | 'empty')[] = [];
    // let avgRating = this.apartment.ratingInfo.avgRating;

    let fullStars = Math.floor(avgRating);
    let hasHalf = avgRating % 1 >= 0.25 && avgRating % 1 < 0.75;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) stars.push('full');
      else if (i === fullStars + 1 && hasHalf) stars.push('half');
      else stars.push('empty');
    }
    
    return stars;
  }

  onPageChange(page: number): void {
    this.params.page = page;
    this.getUserRatingData();
    window.scrollTo({ top: 0 });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
