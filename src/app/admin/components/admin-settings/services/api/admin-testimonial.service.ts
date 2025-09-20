import { Injectable } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';
import { ITestimonialItem } from '../../interfaces/i-settings';
import { HttpClient } from '@angular/common/http';
import { apiPaths } from '../../../../../config/api';

@Injectable({
  providedIn: 'root'
})
export class AdminTestimonialService extends ApiService<ITestimonialItem> {

  constructor(http: HttpClient) {
    super(apiPaths.admin.testimonials, http)
  }
}
