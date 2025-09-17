import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BlAdminReportsRequestsService } from './services/requests/bl-admin-reports-requests.service';
import { IErrorLogSearch, IUseCaseLog, IUseCaseLogSearch } from './interfaces/error-log.interface';
import { IErrorLog } from './interfaces/error-log.interface';
import { ErrorDetailsDialogComponent } from './dialogs/error-details-dialog/error-details-dialog.component';
import { UseCaseDetailsDialogComponent } from './dialogs/use-case-details-dialog/use-case-details-dialog.component';
import { IPaginatedResponse } from '../../../core/interfaces/i-base';
import { PermissionService } from '../../../core/services/permission.service';
import { AdminUseCases } from '../../../core/consts/use-cases';

@Component({
  selector: 'app-admin-reports',
  standalone: false,
  templateUrl: './admin-reports.component.html',
  styleUrl: './admin-reports.component.css'
})
export class AdminReportsComponent implements OnInit {
  
  constructor(
    private reportsService: BlAdminReportsRequestsService,
    private dialog: MatDialog,
    private permissionService: PermissionService
  ) { }

  activeTab: 'useCases' | 'errors' = 'useCases';
  adminUseCases = AdminUseCases;
  useCaseLogs: IPaginatedResponse<IUseCaseLog> = null;
  useCaseLogsLoading = false;
  useCaseLogsSearch: IUseCaseLogSearch = {
    page: 1,
    perPage: 20,
    keyword: '',
  };
  
  // Error Logs
  errorLogs: IPaginatedResponse<IErrorLog> = null;
  errorLogsLoading = false;
  errorLogsSearch: IErrorLogSearch = {
    page: 1,
    perPage: 20,
    keyword: '',
  };


  ngOnInit(): void {
    if(!this.permissionService.has([AdminUseCases.GetUseCaseLogs, AdminUseCases.GetErrorLogs])) return;
    this.loadUseCaseLogs();
    this.loadErrorLogs();
  }

  onTabChange(tab: 'useCases' | 'errors'): void {
    this.activeTab = tab;
  }

  loadUseCaseLogs(): void {
    if(!this.permissionService.has([AdminUseCases.GetUseCaseLogs])) return;
    this.useCaseLogsLoading = true;
    this.reportsService.getUseCaseLogs(this.useCaseLogsSearch || undefined)
      .subscribe({
        next: (response) => {
          this.useCaseLogs = response || null;
          this.useCaseLogsLoading = false;
        },
        error: (error) => {
          console.error('Error loading use case logs:', error);
          this.useCaseLogsLoading = false;
        }
      });
  }

  loadErrorLogs(): void {
    if(!this.permissionService.has([AdminUseCases.GetErrorLogs])) return;
    this.errorLogsLoading = true;
    this.reportsService.getErrorLogs(this.errorLogsSearch)
      .subscribe({
        next: (response) => {
          this.errorLogs = response || null;
          this.errorLogsLoading = false;
        },
        error: (error) => {
          console.error('Error loading error logs:', error);
          this.errorLogsLoading = false;
        }
      });
  }

  onUseCaseLogsSearch(): void {
    this.loadUseCaseLogs();
  }

  onErrorLogsSearch(): void {
    this.loadErrorLogs();
  }

  clearUseCaseLogsSearch(): void {
    this.useCaseLogsSearch.keyword = '';
    this.loadUseCaseLogs();
  }

  clearErrorLogsSearch(): void {
    this.errorLogsSearch.keyword = '';
    this.loadErrorLogs();
  }

  onErrorLogsPageChange(page: number): void {
    this.errorLogsSearch.page = page;
    this.loadErrorLogs();
    window.scrollTo({ top: 0 });
  }

  onUseCaseLogsPageChange(page: number): void {
    this.useCaseLogsSearch.page = page;
    this.loadUseCaseLogs();
    window.scrollTo({ top: 0 });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }

  truncateUseCaseData(data: any): string {
    const jsonString = JSON.stringify(data, null, 2);
    if (jsonString.length > 100) {
      return jsonString.substring(0, 100) + '...';
    }
    return jsonString;
  }

  openUseCaseDialog(log: IUseCaseLog): void {
    this.dialog.open(UseCaseDetailsDialogComponent, {
      data: log,
      width: '800px',
      maxHeight: '80vh',
      panelClass: 'custom-dialog-container'
    });
  }

  openErrorDialog(error: IErrorLog): void {
    this.dialog.open(ErrorDetailsDialogComponent, {
      data: error,
      width: '900px',
      maxHeight: '80vh',
      panelClass: 'custom-dialog-container'
    });
  }
}
