import { Component, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { BlApartmentFilterFormService } from '../../services/forms/bl-apartment-filter-form.service';
import { ApartmentTypesService } from '../../../../shared/api/lookup/apartment-types.service';
import { IBase } from '../../../../core/interfaces/i-base';
import { FormArray } from '@angular/forms';
import { BlApartmentDashboardDataService } from '../../services/shared/bl-apartment-dashboard-data.service';
import { AuthService } from '../../../../auth/services/shared/auth.service';

@Component({
    selector: 'app-apartment-dashboard-filter',
    templateUrl: './apartment-dashboard-filter.component.html',
    styleUrl: './apartment-dashboard-filter.component.css',
    standalone: false
})
export class ApartmentDashboardFilterComponent implements OnInit, OnDestroy {

  constructor(
    private formService: BlApartmentFilterFormService,
    private apartmentTypesService: ApartmentTypesService,
    private dataService: BlApartmentDashboardDataService,
    private authService: AuthService
  ) { }


  @Input() maxFilterPrice: number;
  @Input() minFilterPrice: number;

  public apartmentTypes: IBase[];
  public form = this.formService.getForm();

  public readonly filterPriceOpenState = signal(true);
  public readonly panelOpenState = signal(false);
  public isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.apartmentTypesService.getAll().subscribe({
      next: (data) => {
        this.apartmentTypes = data;
        this.formService.createApartmentTypes(data);
      }
    })

    this.isLoggedIn = this.authService.isLoggedIn();

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
