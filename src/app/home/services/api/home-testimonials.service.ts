import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { IHomeTestimonials } from '../interfaces/i-home-stats';
import { HttpClient } from '@angular/common/http';
import { apiPaths } from '../../../config/api';

@Injectable({
  providedIn: 'root'
})
export class HomeTestimonialsService extends ApiService<IHomeTestimonials> {

  constructor(http: HttpClient) {
    super(apiPaths.home.testimonials, http)
  }
}
