import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiPaths } from '../../../../../config/api';
import { ApiService } from '../../../../../core/services/api.service';
import { IErrorLog, IErrorLogSearch } from '../../interfaces/error-log.interface';
import { IPaginatedResponse } from '../../../../../core/interfaces/i-base';

@Injectable({
  providedIn: 'root'
})
export class AdminErrorLogsService extends ApiService<IPaginatedResponse<IErrorLog>> {

  constructor(http: HttpClient) {
    super(apiPaths.admin.errors, http);
  }

  getErrorLogs(search?: IErrorLogSearch): any {
    return this.getAllByQueryParams(search);
  }
}
