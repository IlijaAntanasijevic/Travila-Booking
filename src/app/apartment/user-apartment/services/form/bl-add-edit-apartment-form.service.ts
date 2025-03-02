import { Injectable } from '@angular/core';
import { IFormService } from '../../../../core/interfaces/i-form-service';
import { IAddApartmentRequest, IAddEditApartmentForm } from '../../interfaces/i-add-edit-apartment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BlAddEditApartmentRequestsService } from '../requests/bl-add-edit-apartment-requests.service';

@Injectable({
  providedIn: 'root'
})
export class BlAddEditApartmentFormService implements IFormService<IAddEditApartmentForm> {

  constructor(
    private requestsService: BlAddEditApartmentRequestsService
  ) { }

  form: FormGroup<any> = this.init();

  init(): FormGroup {
    return new FormGroup({
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      address: new FormControl({ value: "", disabled: true }, Validators.required),
      city: new FormControl({ value: "", disabled: true }, Validators.required),
      guests: new FormGroup({
        adults: new FormControl({ value: 1, disabled: true }, [Validators.required, Validators.min(1)]),
        childrens: new FormControl({ value: 0, disabled: true }, [Validators.required, Validators.min(0)]),
        totalRooms: new FormControl({ value: 1, disabled: true }, [Validators.required, Validators.min(1)])
      }),
      // location: new FormControl(null, Validators.required),
      longitude: new FormControl(null, Validators.required),
      lattitude: new FormControl(null, Validators.required),
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


  prepareDataToSend(): FormData {
    const data = this.getFormData();

    console.log(data);

    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("address", data.address);
    formData.append("cityId", data.city.id.toString());
    formData.append("countryId", data.country.id.toString());
    formData.append("longitude", data.longitude.toString());
    formData.append("lattitude", data.lattitude.toString());
    formData.append("pricePerNight", data.price.toString());
    formData.append("apartmentTypeId", data.apartmentTypeId.toString());
    formData.append("guests", JSON.stringify(data.guests));

    const mainImageFile = data.mainImage.get("file");
    if (mainImageFile) {
      formData.append("mainImage", mainImageFile as Blob, "mainImage.jpg");
    }

    data.images.forEach((imageFormData, index) => {
      const imageFile = imageFormData.get("file");
      if (imageFile) {
        formData.append("images", imageFile as Blob, `image_${index}.jpg`);
      }
    });

    data.featureIds.forEach((id) => {
      formData.append("featureIds[]", id.toString());
    });

    data.paymentMethodIds.forEach((id) => {
      formData.append("paymentMethodIds[]", id.toString());
    });

    return formData;
  }

  submitInsert(): Observable<any> {
    const data = this.prepareDataToSend();
    return this.requestsService.testCreate(data);
  }

  reset(): void {
    this.form.reset();
    this.form = this.init();
  }
}
