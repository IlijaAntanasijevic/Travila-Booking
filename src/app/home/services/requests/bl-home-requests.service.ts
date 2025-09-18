import { Injectable } from '@angular/core';
import { HomeStatsService } from '../api/home-stats.service';
import { HomeTestimonialsService } from '../api/home-testimonials.service';
import { IHomeStats, IHomeTestimonials } from '../interfaces/i-home-stats';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlHomeRequestsService {

  constructor(
    private homeStatsService: HomeStatsService,
    private homeTestimonialsService: HomeTestimonialsService,
  ) { }

  getHomeStats(): Observable<IHomeStats> {
    return this.homeStatsService.getAllObject();
  }

  getHomeTestimonials(): Observable<IHomeTestimonials[]> {
    return this.homeTestimonialsService.getAll();
  }
}
