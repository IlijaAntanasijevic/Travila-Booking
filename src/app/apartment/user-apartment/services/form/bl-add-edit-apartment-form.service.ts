import { Injectable } from '@angular/core';
import { IFormService } from '../../../../core/interfaces/i-form-service';
import { IAddApartmentRequest, IAddEditApartmentForm } from '../../interfaces/i-add-edit-apartment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, tap } from 'rxjs';
import { BlAddEditApartmentRequestsService } from '../requests/bl-add-edit-apartment-requests.service';
import { IApartmenImage } from '../../../interfaces/i-apartment';

@Injectable({
  providedIn: 'root'
})
export class BlAddEditApartmentFormService implements IFormService<IAddEditApartmentForm> {

  constructor(
    private requestsService: BlAddEditApartmentRequestsService
  ) { }

  form: FormGroup<any> = this.init();
  private subscription: Subscription = new Subscription();

  init(): FormGroup {
    return new FormGroup({
      name: new FormControl("Test 1", Validators.required),
      description: new FormControl("Test aaa 20 karaktera aaaa pp", Validators.required),
      address: new FormControl({ value: "", disabled: true }, Validators.required),
      city: new FormControl({ value: "", disabled: true }, Validators.required),
      guests: new FormGroup({
        adults: new FormControl({ value: 5, disabled: true }, [Validators.required, Validators.min(1)]),
        childrens: new FormControl({ value: 2, disabled: true }, [Validators.required, Validators.min(0)]),
        totalRooms: new FormControl({ value: 4, disabled: true }, [Validators.required, Validators.min(1)])
      }),
      // location: new FormControl(null, Validators.required),
      longitude: new FormControl(null, Validators.required),
      lattitude: new FormControl(null, Validators.required),
      images: new FormControl([], Validators.required),
      country: new FormControl("", Validators.required),
      price: new FormControl(30, Validators.required),
      mainImage: new FormControl("", Validators.required),
      apartmentTypeId: new FormControl("", Validators.required),
      featureIds: new FormControl(null),
      paymentMethodIds: new FormControl("", Validators.required),
    });
  }

  getForm(): FormGroup {
    return this.form;
  }

  getFormData(): IAddEditApartmentForm {
    return this.form.getRawValue();
  }

  fillForm(id: number): Observable<any> {
    return this.requestsService.getApartmentById(id).pipe(
      tap(data => {
        this.form.patchValue({
          name: data.name,
          description: data.description,
          address: data.address,
          city: data.city,
          country: data.country,
          longitude: data.longitude,
          lattitude: data.lattitude,
          price: data.pricePerNight,
          mainImage: data.mainImage,
          images: data.images,    
          guests: {  
          adults: data.adults,
          childrens: data.childrens,
          totalRooms: data.totalRooms
        },
          apartmentTypeId: data.apartmentTypeId,
          featureIds: data.features?.map((feature: any) => feature.id),
          paymentMethodIds: data.paymentMethods.map((paymentMethod: any) => paymentMethod.id),
        });
      }
    ));
  }

  prepareDataToSend(): IAddApartmentRequest {
    const data = this.getFormData();
    // let formData = new FormData();
    // formData.append("name", data.name);
    // formData.append("description", data.description);
    // formData.append("address", data.address);
    // formData.append("cityId", data.city.id.toString());
    // formData.append("countryId", data.country.id.toString());
    // formData.append("longitude", data.longitude.toString());
    // formData.append("lattitude", data.lattitude.toString());
    // formData.append("pricePerNight", data.price.toString());
    // formData.append("apartmentTypeId", data.apartmentTypeId.toString());
    // formData.append("guests", JSON.stringify(data.guests));

    // const mainImageFile = data.mainImage.get("file");
    // if (mainImageFile) {
    //   formData.append("mainImage", mainImageFile as Blob, "mainImage.jpg");
    // }

    // data.images.forEach((imageFormData, index) => {
    //   const imageFile = imageFormData.get("file");
    //   if (imageFile) {
    //     formData.append("images", imageFile as Blob, `image_${index}.jpg`);
    //   }
    // });

    // data.featureIds.forEach((id) => {
    //   formData.append("featureIds[]", id.toString());
    // });

    // data.paymentMethodIds.forEach((id) => {
    //   formData.append("paymentMethodIds[]", id.toString());
    // });
    let requestData: IAddApartmentRequest = {
      name: data.name,
      description: data.description,
      address: data.address,
      cityId: data.city.id,
      countryId: data.country.id,
      longitude: data.longitude,
      lattitude: data.lattitude,
      price: data.price,
      apartmentTypeId: data.apartmentTypeId,
      guests: {
        adults: data.guests.adults,
        childrens: data.guests.childrens,
        totalRooms: data.guests.totalRooms
      },
      featureIds: data.featureIds,
      paymentMethodIds: data.paymentMethodIds,
      mainImage: typeof data.mainImage === 'string' ? data.mainImage : data.mainImage.fileName,
      // images: typeof data.images === 'string' ? [data.images] : data.images.map((image: IApartmenImage) => image.fileName),
      images: []
    }

    data.images.forEach(image => {
      if(typeof image === 'string') {
        requestData.images.push(image);
      }
      else {
        requestData.images.push(image.fileName);
      }
    });

    return requestData;
  }

  submitInsert(): Observable<any> {
    const data = this.prepareDataToSend();
    return this.requestsService.addApartment(data);
  }

  submitUpdate(id: number): Observable<any> {
    const data = this.prepareDataToSend();
    return this.requestsService.editApartment(id, data);
  }

  reset(): void {
    this.form.reset();
    this.form = this.init();
  }
}
