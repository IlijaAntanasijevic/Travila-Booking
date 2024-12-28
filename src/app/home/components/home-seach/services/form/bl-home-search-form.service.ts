import { Injectable } from '@angular/core';
import { IFormService } from '../../../../../core/interfaces/i-form-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISearchHome, ISearchHomeRequest } from '../../interfaces/i-search-home';
import { IBase } from '../../../../../core/interfaces/i-base';
import { locationValidator } from '../../validators/location-validator';

@Injectable({
  providedIn: 'root'
})
export class BlHomeSearchFormService implements IFormService<ISearchHome>{

  constructor() { }

  form: FormGroup<any> = this.init();

  init(): FormGroup {
    return new FormGroup({
      city: new FormControl<string | IBase>('', Validators.required),
      checkIn: new FormControl<Date | null>(null, Validators.required),
      checkOut: new FormControl<Date | null>(null, Validators.required),
      adults: new FormControl<number>({value: 2, disabled: true}),
      childrens: new FormControl<number>({value: 0, disabled: true}),
      rooms: new FormControl<number>({value: 1, disabled: true})
    })
  }

  getForm(): FormGroup {
    return this.form;
  }

  getFormData(): ISearchHome {
    return this.form.getRawValue();
  }

  fillForm(filteredData: ISearchHomeRequest): void {    
    this.form.setValue({
      city: Number(filteredData.cityId), 
      checkIn: new Date(filteredData.checkIn), 
      checkOut: new Date(filteredData.checkOut),
      adults: filteredData.adults,
      childrens: filteredData.childrens,
      rooms: filteredData.rooms,
    })
  }

  reset(): void {
    this.form = this.init();
  }
}
