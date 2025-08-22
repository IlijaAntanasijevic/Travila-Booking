import { Injectable } from '@angular/core';
import { CityService } from '../../../../shared/api/lookup/city.service';
import { ApartmentTypesService } from '../../../../shared/api/lookup/apartment-types.service';
import { CountryService } from '../../../../shared/api/lookup/country.service';
import { PaymentTypeService } from '../../../../shared/api/lookup/payment-type.service';
import { FeaturesService } from '../../../../shared/api/lookup/features.service';
import { forkJoin, Observable } from 'rxjs';
import { IBase } from '../../../../core/interfaces/i-base';
import { ApartmentService } from '../../../services/api/apartment.service';
import { ApartmentImageService } from '../../../services/api/apartment-image.service';
import { ImagesService } from '../../../../shared/api/images.service';
import { IAddApartmentRequest, IApartmentUploadImage } from '../../interfaces/i-add-edit-apartment';
import { ArchiveService } from '../api/archive.service';

@Injectable({
  providedIn: 'root'
})
export class BlAddEditApartmentRequestsService {

  constructor(
    private apiService: ApartmentService,
    private cityService: CityService,
    private apartmentTypeService: ApartmentTypesService,
    private countryService: CountryService,
    private paymentTypeService: PaymentTypeService,
    private featuresService: FeaturesService,
    private apartmentImageService: ApartmentImageService,
    private imagesService: ImagesService
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

  getApartmentById(id: number): Observable<any> {
    return this.apiService.getOne(id);
  }

  addApartment(data: IAddApartmentRequest): Observable<any> {
    return this.apiService.create(data);
  }

  editApartment(id: number, data: IAddApartmentRequest): Observable<any> {
    return this.apiService.update(id, data);
  }

  getApartmentImage(fileName: string): Observable<any> {
    return this.apartmentImageService.getImage(fileName);
  }

  uploadImages(request: IApartmentUploadImage[]): Observable<any> {
    return this.imagesService.create(request);
  }

}
