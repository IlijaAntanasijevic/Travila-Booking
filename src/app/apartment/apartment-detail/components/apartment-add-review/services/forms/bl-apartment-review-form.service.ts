import { Injectable } from '@angular/core';
import { IFormService } from '../../../../../../core/interfaces/i-form-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
      accessibility: new FormControl(null, Validators.required),
      entertainment: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      safety: new FormControl(null, Validators.required),
      service: new FormControl(null, Validators.required),
      support: new FormControl(null, Validators.required),
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
  }

  prepareDataToSend(): IApartmentReviewRequest {
    const data = this.getFormData();

    let dataToSend: IApartmentReviewRequest = {
      comment: data.comment,
      accessibility: data.accessibility,
      safety: data.safety,
      service: data.service,
      support: data.service,
      price: data.price,
      entertainment: data.entertainment
    }

    return dataToSend;
  }

  submit(): Observable<any> {
    let data = this.prepareDataToSend();
    return this.requestsService.addReview(data);
  }
}
