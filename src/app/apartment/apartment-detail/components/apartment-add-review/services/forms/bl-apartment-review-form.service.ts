import { Injectable } from '@angular/core';
import { IFormService } from '../../../../../../core/interfaces/i-form-service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IApartmentReview, IApartmentReviewRequest } from '../../interfaces/i-apartment-review';
import { Observable } from 'rxjs';
import { BlApartmentReviewRequestsService } from '../requests/bl-apartment-review-requests.service';

@Injectable({
  providedIn: 'root'
})
export class BlApartmentReviewFormService implements IFormService<IApartmentReview> {

  constructor(
    private requestsService: BlApartmentReviewRequestsService
  ) { }

  form: FormGroup<any> = this.init();

  init(): FormGroup {
    return new FormGroup({
      comment: new FormControl(null, [Validators.required]),
      apartmentId: new FormControl(null),
      values: new FormArray([
      new FormGroup({
        id: new FormControl(1), // Accessibility
        value: new FormControl(null, Validators.required),
      }),
      new FormGroup({
        id: new FormControl(2), // Entertainment
        value: new FormControl(null, Validators.required),
      }),
      new FormGroup({
        id: new FormControl(3), // Price
        value: new FormControl(null, Validators.required),
      }),
      new FormGroup({
        id: new FormControl(4), // Safety
        value: new FormControl(null, Validators.required),
      }),
      new FormGroup({
        id: new FormControl(5), // Service
        value: new FormControl(null, Validators.required),
      }),
      new FormGroup({
        id: new FormControl(6), // Support
        value: new FormControl(null, Validators.required),
      })
      ])
    })
  }

  getForm(): FormGroup {
    return this.form;
  }

  getFormData(): IApartmentReview {
    return this.form.getRawValue();
  }

  reset(): void {
    this.form = this.init();
    this.form.reset();
  }

  prepareDataToSend(): IApartmentReviewRequest {
    const data = this.getFormData();

    let dataToSend: IApartmentReviewRequest = {
      comment: data.comment,
      apartmentId: data.apartmentId,
      values: data.values
    }

    return dataToSend;
  }

  submit(): Observable<any> {
    let data = this.prepareDataToSend();
    return this.requestsService.addRating(data);
  }
}
