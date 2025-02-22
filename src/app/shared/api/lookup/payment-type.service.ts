import { Injectable } from '@angular/core';
import { IBase } from '../../../core/interfaces/i-base';
import { HttpClient } from '@angular/common/http';
import { apiPaths } from '../../../config/api';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentTypeService extends ApiService<IBase> {

  constructor(http: HttpClient) {
    super(apiPaths.lookup.paymentType, http)
  }
}
