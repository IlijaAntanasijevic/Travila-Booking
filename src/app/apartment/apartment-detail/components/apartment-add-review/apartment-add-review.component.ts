import { Component, Input, OnDestroy } from '@angular/core';
import { RATING_CATEGORY } from './enums/review-category';
import { BlApartmentReviewFormService } from './services/forms/bl-apartment-review-form.service';
import { Spinner } from '../../../../core/functions/spinner';
import { IApartmentReview, IApartmentReviewRequest } from './interfaces/i-apartment-review';
import { FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-apartment-add-review',
    templateUrl: './apartment-add-review.component.html',
    styleUrl: './apartment-add-review.component.css',
    standalone: false
})
export class ApartmentAddReviewComponent implements OnDestroy{

  constructor(
    private formService: BlApartmentReviewFormService
  ) { }

  form = this.formService.getForm();
  @Input('apartmentId') apartmentId: number;

  categories = RATING_CATEGORY;
  stars: number[] = [1, 2, 3, 4, 5];
  private subscription: Subscription = new Subscription();

  ratings = {
    [RATING_CATEGORY.Price]: 0,
    [RATING_CATEGORY.Service]: 0,
    [RATING_CATEGORY.Safety]: 0,
    [RATING_CATEGORY.Entertainment]: 0,
    [RATING_CATEGORY.Accessibility]: 0,
    [RATING_CATEGORY.Support]: 0
  };

  getStarSrc(category: RATING_CATEGORY, starIndex: number): string {
    return starIndex <= this.ratings[category]
      ? 'assets/images/page/tour-detail/star-big.svg'
      : 'assets/images/page/tour-detail/star-big-transparent.svg';
  }

  updateRating(category: RATING_CATEGORY, starIndex: number): void {
    this.ratings[category] = starIndex;
    let categoryId = this.getCategoryId(category);
    let formArray = this.form.get('values') as FormArray;
    let valueIndex = formArray.controls.findIndex(control => control.get('id').value === categoryId);

    if (valueIndex !== -1) {
      formArray.at(valueIndex).get('value')?.setValue(starIndex);
    }
  }

  private getCategoryId(category: RATING_CATEGORY): number {
  switch (category) {
    case RATING_CATEGORY.Price: return 1;
    case RATING_CATEGORY.Service: return 2;
    case RATING_CATEGORY.Safety: return 3;
    case RATING_CATEGORY.Entertainment: return 4;
    case RATING_CATEGORY.Accessibility: return 5;
    case RATING_CATEGORY.Support: return 6;
    default: return 0;
  }
}


  sumbit(): void {
    Spinner.show();
    this.form.get('apartmentId').setValue(this.apartmentId);
    this.subscription.add(
    this.formService.submit().subscribe({
      next: (data) => {
        Spinner.hide()
      },
      error: err => Spinner.hide()
    })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.formService.reset();
  }
}
