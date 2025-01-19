import { Component } from '@angular/core';
import { ReviewCategory } from './enums/review-category';
import { BlApartmentReviewFormService } from './services/forms/bl-apartment-review-form.service';
import { Spinner } from '../../../../core/functions/spinner';
import { IApartmentReview, IApartmentReviewRequest } from './interfaces/i-apartment-review';

@Component({
  selector: 'app-apartment-add-review',
  templateUrl: './apartment-add-review.component.html',
  styleUrl: './apartment-add-review.component.css'
})
export class ApartmentAddReviewComponent {

  constructor(
    private formService: BlApartmentReviewFormService
  ) { }

  form = this.formService.getForm();

  categories = ReviewCategory;
  stars: number[] = [1, 2, 3, 4, 5];

  ratings = {
    [ReviewCategory.Price]: 0,
    [ReviewCategory.Service]: 0,
    [ReviewCategory.Safety]: 0,
    [ReviewCategory.Entertainment]: 0,
    [ReviewCategory.Accessibility]: 0,
    [ReviewCategory.Support]: 0
  };

  getStarSrc(category: ReviewCategory, starIndex: number): string {
    return starIndex <= this.ratings[category]
      ? 'assets/images/page/tour-detail/star-big.svg'
      : 'assets/images/page/tour-detail/star-big-transparent.svg';
  }

  updateRating(category: ReviewCategory, starIndex: number): void {
    this.ratings[category] = starIndex;
    this.form.get(category.toLowerCase()).setValue(starIndex);
  }


  sumbit(): void {
    Spinner.show();
    this.formService.submit().subscribe({
      next: (data) => {
        Spinner.hide()
      },
      error: err => {
        console.log(err);
        Spinner.hide();

      }
    })

  }
}
