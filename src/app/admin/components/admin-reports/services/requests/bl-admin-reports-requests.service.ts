import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminUseCaseLogsService } from '../api/admin-use-case-logs.service';
import { AdminErrorLogsService } from '../api/admin-error-logs.service';
import { IErrorLog, IErrorLogSearch, IUseCaseLog, IUseCaseLogSearch } from '../../interfaces/error-log.interface';
import { IPaginatedResponse } from '../../../../../core/interfaces/i-base';

@Injectable({
  providedIn: 'root'
})
export class BlAdminReportsRequestsService {

  constructor(
    private useCaseLogsService: AdminUseCaseLogsService,
    private errorLogsService: AdminErrorLogsService
  ) { }

  getUseCaseLogs(search?: IUseCaseLogSearch): Observable<IPaginatedResponse<IUseCaseLog>> {
    return this.useCaseLogsService.getUseCaseLogs(search);
  }

  getErrorLogs(search?: IErrorLogSearch): Observable<IPaginatedResponse<IErrorLog>> {
    return this.errorLogsService.getErrorLogs(search);
  }
}
