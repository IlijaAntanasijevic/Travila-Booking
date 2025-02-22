import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlAddEditApartmentFormService } from '../../services/form/bl-add-edit-apartment-form.service';
import { BlAddEditApartmentRequestsService } from '../../services/requests/bl-add-edit-apartment-requests.service';
import { IApartmentDdlData } from '../../interfaces/i-add-edit-apartment';
import { Subscription } from 'rxjs';
import { Spinner } from '../../../../core/functions/spinner';
import { IBase } from '../../../../core/interfaces/i-base';

@Component({
  selector: 'app-add-edit-apartment',
  templateUrl: './add-edit-apartment.component.html',
  styleUrl: './add-edit-apartment.component.css'
})
export class AddEditApartmentComponent implements OnInit, OnDestroy {

  constructor(
    private formService: BlAddEditApartmentFormService,
    private requestsService: BlAddEditApartmentRequestsService
  ) { }

  private subscription: Subscription = new Subscription();
  form = this.formService.getForm();
  ddlData: IApartmentDdlData = {
    features: [],
    apartmentTypes: [],
    countries: [],
    paymentMethods: [],
    cities: []
  }

  ngOnInit(): void {
    this.getDllData();
    this.form.markAllAsTouched();

  }

  getDllData(): void {
    Spinner.show();
    this.subscription.add(
      this.requestsService.getAllData().subscribe({
        next: (data) => {
          this.ddlData.countries = data?.countries;
          this.ddlData.features = data?.features;
          this.ddlData.apartmentTypes = data?.apartmentTypes;
          this.ddlData.paymentMethods = data?.paymentTypes;

          Spinner.hide();
        },
        error: (err) => {
          Spinner.hide();
        }
      })
    )
  }

  getCities(): void {
    Spinner.show();
    const cityControl = this.form.controls['cityId'];
    let countryId = this.formService.getFormData().country.id;
    this.subscription.add(
      this.requestsService.getCitiesByCountryId(countryId).subscribe({
        next: (data) => {
          this.ddlData.cities = data;
          cityControl.enable();
          cityControl.setValue("")
          Spinner.hide();
        },
        error: (err) => {
          Spinner.hide();
        }
      })
    )
  }

  displayFn(value: IBase): string {
    return value && value.name ? value.name : '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
