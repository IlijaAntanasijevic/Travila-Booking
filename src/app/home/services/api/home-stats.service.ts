import { Injectable } from '@angular/core';
import { IHomeStats } from '../interfaces/i-home-stats';
import { ApiService } from '../../../core/services/api.service';
import { HttpClient } from '@angular/common/http';
import { apiPaths } from '../../../config/api';

@Injectable({
  providedIn: 'root'
})
export class HomeStatsService extends ApiService<IHomeStats> {

  constructor(http: HttpClient) {
    super(apiPaths.home.stats, http)
  }
}
