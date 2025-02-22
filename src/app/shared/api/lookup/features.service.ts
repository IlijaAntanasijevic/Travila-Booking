import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { IBase } from '../../../core/interfaces/i-base';
import { HttpClient } from '@angular/common/http';
import { apiPaths } from '../../../config/api';

@Injectable({
  providedIn: 'root'
})
export class FeaturesService extends ApiService<IBase> {

  constructor(http: HttpClient) {
    super(apiPaths.lookup.features, http)
  }
}
