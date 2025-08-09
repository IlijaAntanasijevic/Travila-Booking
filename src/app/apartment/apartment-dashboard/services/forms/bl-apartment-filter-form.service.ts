import { Injectable } from '@angular/core';
import { IFormService } from '../../../../core/interfaces/i-form-service';
import { IFilter } from '../../interfaces/i-filter';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { IBase } from '../../../../core/interfaces/i-base';
import { SortDirection } from '../../enums/sort-type';

@Injectable({
  providedIn: 'root'
})
export class BlApartmentFilterFormService implements IFormService<IFilter>{

  constructor() { }

  form: FormGroup<any> = this.init();

  init(): FormGroup {
    return new FormGroup({
      maxPrice: new FormControl(null),
      apartmentTypeIds: new FormArray([]),
      sorts: new FormArray([ 
        new FormGroup({
          sortProperty: new FormControl(null),
          direction: new FormControl(SortDirection.Asc),
        }),
      ]),
      perPage: new FormControl(6),
      cityId: new FormControl(null),
      isAvailable: new FormControl(false),
      isMyApartment: new FormControl(true),
    })
  }

  getForm(): FormGroup {
    return this.form;
  }

  getFormData(): IFilter {
    return this.form.getRawValue();
  }

  createApartmentTypes(types: IBase[]): void {
    const formArray = this.form.get('apartmentTypeIds') as FormArray;

    types.forEach(type => {
      const group = new FormGroup({
      id: new FormControl(type.id),
      name: new FormControl(type.name),
      selected: new FormControl(false)
    });
    formArray.push(group);
    })
  }

  setSelectedApartmentTypes(): void{
    let ids = this.form.value.apartmentTypeIds.filter((type: any) => type.selected).map((type: any) => type.id); 
    this.form.value.apartmentTypeIds = ids.length == 0 ? null : ids; 
    
  }

  reset(): void {
    this.form = this.init();
  }
}
