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
      comment: new FormControl(null, [Validators.required, Validators.minLength(10)]),
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
    // Reset comment and apartmentId
    this.form.get('comment')?.reset(null);
    this.form.get('apartmentId')?.reset(null);

    // Reset FormArray values to initial state
    const valuesArray = this.form.get('values') as FormArray;
    if (valuesArray) {
      const initialValues = [
        { id: 1, value: null },
        { id: 2, value: null },
        { id: 3, value: null },
        { id: 4, value: null },
        { id: 5, value: null },
        { id: 6, value: null }
      ];
      valuesArray.controls.forEach((group, idx) => {
        group.get('id')?.setValue(initialValues[idx].id);
        group.get('value')?.reset(null);
      });
    }
    this.form.markAsPristine();
    this.form.markAsUntouched();
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
