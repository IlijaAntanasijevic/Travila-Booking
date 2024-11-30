import { Component, OnInit, signal } from '@angular/core';
import { ApartmentViewMode } from '../../enums/view-mode-enum';
import { BlApartmentDashboardDataService } from '../../services/shared/bl-apartment-dashboard-data.service';
import { BlApartmentsRequestsService } from '../../../services/requests/bl-apartments-requests.service';
import { Spinner } from '../../../../core/functions/spinner';
import { IApartment } from '../../../interfaces/i-apartment';
import { IPaginatedResponse } from '../../../../core/interfaces/i-base';

@Component({
  selector: 'app-apartment-dashboard-overview',
  templateUrl: './apartment-dashboard-overview.component.html',
  styleUrl: './apartment-dashboard-overview.component.css'
})
export class ApartmentDashboardOverviewComponent implements OnInit {

  constructor(
    private dataService: BlApartmentDashboardDataService,
    private requestsService: BlApartmentsRequestsService
  ) { }

  public currentViewMode: ApartmentViewMode = ApartmentViewMode.LIST;
  public ApartmentViewMode = ApartmentViewMode;
  public apartmentsData: IPaginatedResponse<IApartment>;

  ngOnInit(): void {
    this.getData();
    this.trackViewMode();   
  }

  getData(): void {
    Spinner.show();
    this.requestsService.getAll().subscribe({
      next: (data) => {
        this.apartmentsData = data;
        Spinner.hide();
      },
      error: (err) => {
        Spinner.hide();
      }
    })
  }

  trackViewMode(): void {
    this.dataService.viewMode.subscribe({
      next: (data) => {                
         this.currentViewMode = data;
      }
    })
  }
}
