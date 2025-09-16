import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiPaths } from '../../../../../config/api';
import { ApiService } from '../../../../../core/services/api.service';
import { IUseCaseLog, IUseCaseLogSearch } from '../../interfaces/error-log.interface';
import { IPaginatedResponse } from '../../../../../core/interfaces/i-base';

@Injectable({
  providedIn: 'root'
})
export class AdminUseCaseLogsService extends ApiService<IPaginatedResponse<IUseCaseLog>> {

  constructor(http: HttpClient) {
    super(apiPaths.admin.reports, http);
  }

  getUseCaseLogs(search?: IUseCaseLogSearch): any {
    return this.getAllByQueryParams(search);
  }
}
