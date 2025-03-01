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
      city: new FormControl({ value: "", disabled: true }, Validators.required),
      guests: new FormGroup({
        adults: new FormControl({ value: 1, disabled: true }, [Validators.required, Validators.min(1)]),
        childrens: new FormControl({ value: 0, disabled: true }, [Validators.required, Validators.min(0)]),
        totalRooms: new FormControl({ value: 1, disabled: true }, [Validators.required, Validators.min(1)])
      }),
      location: new FormControl(null, Validators.required),
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
