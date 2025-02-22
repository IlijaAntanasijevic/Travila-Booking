import { Injectable } from '@angular/core';
import { IFormService } from '../../../../core/interfaces/i-form-service';
import { IAddEditApartmentForm } from '../../interfaces/i-add-edit-apartment';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class BlAddEditApartmentFormService implements IFormService<IAddEditApartmentForm> {

  constructor() { }

  form: FormGroup<any> = this.init();

  init(): FormGroup {
    return new FormGroup({
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      cityId: new FormControl({ value: "", disabled: true }, Validators.required),
      maxGuests: new FormControl("", Validators.required),
      images: new FormControl([], Validators.required),
      country: new FormControl("", Validators.required),
      price: new FormControl("", Validators.required),
      mainImage: new FormControl("", Validators.required),
      apartmentTypeId: new FormControl("", Validators.required),
      featureIds: new FormControl(""),
      paymentMethodIds: new FormControl("", Validators.required),
    });
  }

  getForm(): FormGroup {
    return this.form;
  }

  getFormData(): IAddEditApartmentForm {
    return this.form.getRawValue();
  }

  reset(): void {
    this.form.reset();
    this.form = this.init();
  }
}
