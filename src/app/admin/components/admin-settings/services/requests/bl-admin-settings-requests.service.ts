import { Injectable } from '@angular/core';
import { PaymentTypeService } from '../../../../../shared/api/lookup/payment-type.service';
import { ApartmentTypesService } from '../../../../../shared/api/lookup/apartment-types.service';
import { FeaturesService } from '../../../../../shared/api/lookup/features.service';
import { forkJoin, Observable, of } from 'rxjs';
import { IApartmentFeature, ICity, IPaymentMethod, ITestimonialItem } from '../../interfaces/i-settings';
import { AdminCityService } from '../../services/api/admin-city.service';
import { CityService } from '../../../../../shared/api/lookup/city.service';
import { CountryService } from '../../../../../shared/api/lookup/country.service';
import { IBase } from '../../../../../core/interfaces/i-base';
import { CityCountryService } from '../../../../../shared/api/lookup/city-country.service';
import { AdminTestimonialService } from '../api/admin-testimonial.service';

@Injectable({
  providedIn: 'root'
})
export class BlAdminSettingsRequestsService {

  constructor(
    private adminCityService: AdminCityService,
    private cityService: CityService,
    private cityCountryService: CityCountryService,
    private countryService: CountryService,
    private paymentTypeService: PaymentTypeService,
    private apartmentTypeService: ApartmentTypesService,
    private featuresService: FeaturesService,
    private adminTestimonialService: AdminTestimonialService
  ) { }

  getAllData(canViewTestimonials: boolean = false): Observable<any> {
    return forkJoin({
      cities: this.adminCityService.getAll(),
      paymentTypes: this.paymentTypeService.getAllByQueryParams({
        isActive: false
      }),
      apartmentTypes: this.apartmentTypeService.getAllByQueryParams({
        isActive: false
      }),
      features: this.featuresService.getAllByQueryParams({
        isActive: false
      }),
      testimonials: canViewTestimonials ? this.getAllTestimonials() : of([])
    });
  }

  addCity(data: ICity): Observable<any> {
    return this.adminCityService.create(data);
  }

  updatePaymentMethod(data: IPaymentMethod): Observable<any> {
    return this.paymentTypeService.update(data.id, data);
  }

  addPaymentMethod(data: IPaymentMethod): Observable<any> {
    return this.paymentTypeService.create(data);
  }

  getAllCountries(): Observable<IBase[]> {
    return this.countryService.getAllAdminCountries();
  }

  createCity(data: ICity): Observable<any> {
    return this.cityCountryService.create(data)
  }

  updateCity(data: ICity): Observable<any> {
    return this.cityCountryService.update(data.id, data)
  }

  addApartmentType(data: any): Observable<any> {
    return this.apartmentTypeService.create(data);
  }

  updateApartmentType(data: any): Observable<any> {
    return this.apartmentTypeService.update(data.id, data);
  }

  addFetaure(data: IApartmentFeature): Observable<any> {
    return this.featuresService.create(data);
  }

  updateFeature(data: IApartmentFeature): Observable<any> {
    return this.featuresService.update(data.id, data);
  }

  getAllTestimonials(): Observable<any> {
    return this.adminTestimonialService.getAll();
  }

  updateTestimonial(data: ITestimonialItem): Observable<any> {
    return this.adminTestimonialService.update(data.id, data);
  }

}
