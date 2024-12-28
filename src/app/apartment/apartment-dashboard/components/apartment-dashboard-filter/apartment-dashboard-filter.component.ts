import { Component, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { BlApartmentFilterFormService } from '../../services/forms/bl-apartment-filter-form.service';
import { ApartmentTypesService } from '../../../../shared/api/apartment-types.service';
import { IBase } from '../../../../core/interfaces/i-base';
import { FormArray } from '@angular/forms';
import { BlApartmentDashboardDataService } from '../../services/shared/bl-apartment-dashboard-data.service';

@Component({
  selector: 'app-apartment-dashboard-filter',
  templateUrl: './apartment-dashboard-filter.component.html',
  styleUrl: './apartment-dashboard-filter.component.css'
})
export class ApartmentDashboardFilterComponent implements OnInit, OnDestroy{

  constructor(
    private formService: BlApartmentFilterFormService,
    private apartmentTypesService: ApartmentTypesService,
    private dataService: BlApartmentDashboardDataService
  ) {}


  @Input() maxFilterPrice: number;
  @Input() minFilterPrice: number;

  public apartmentTypes: IBase[];
  public form = this.formService.getForm();

  public readonly filterPriceOpenState = signal(true);
  public readonly panelOpenState = signal(false);

  ngOnInit(): void {
    this.apartmentTypesService.getAll().subscribe({
      next: (data) => {
        this.apartmentTypes = data;
        this.formService.createApartmentTypes(data);    
      }
    })
    
  }

  searchFilter(): void {
    const formValue = this.form.value;    
    this.formService.setSelectedApartmentTypes();
    
    this.dataService.filter.next(formValue);
  }

  apartmentTypesForm() {
    return this.form.get('apartmentTypeIds') as FormArray;
  }

  ngOnDestroy(): void {
      this.formService.reset();
  }

}
