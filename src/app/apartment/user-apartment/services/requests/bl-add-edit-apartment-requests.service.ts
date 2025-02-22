import { Injectable } from '@angular/core';
import { CityService } from '../../../../shared/api/lookup/city.service';
import { ApartmentTypesService } from '../../../../shared/api/lookup/apartment-types.service';
import { CountryService } from '../../../../shared/api/lookup/country.service';
import { PaymentTypeService } from '../../../../shared/api/lookup/payment-type.service';
import { FeaturesService } from '../../../../shared/api/lookup/features.service';
import { forkJoin, Observable } from 'rxjs';
import { IBase } from '../../../../core/interfaces/i-base';

@Injectable({
  providedIn: 'root'
})
export class BlAddEditApartmentRequestsService {

  constructor(
    private cityService: CityService,
    private apartmentTypeService: ApartmentTypesService,
    private countryService: CountryService,
    private paymentTypeService: PaymentTypeService,
    private featuresService: FeaturesService
  ) { }


  getAllData(): Observable<any> {
    const request = {
      "countries": this.countryService.getAll(),
      "apartmentTypes": this.apartmentTypeService.getAll(),
      "paymentTypes": this.paymentTypeService.getAll(),
      "features": this.featuresService.getAll()
    };

    return forkJoin(request);
  }

  getCitiesByCountryId(id: number): Observable<IBase[]> {
    return this.cityService.getAllByCountryId(id)
  }
}
