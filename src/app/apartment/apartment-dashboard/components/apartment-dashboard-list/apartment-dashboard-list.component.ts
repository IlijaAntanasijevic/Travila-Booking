import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IApartment } from '../../../interfaces/i-apartment';
import { IPaginatedResponse } from '../../../../core/interfaces/i-base';
import { BlApartmentDashboardDataService } from '../../services/shared/bl-apartment-dashboard-data.service';
import { AuthService } from '../../../../auth/services/shared/auth.service';

@Component({
  selector: 'app-apartment-dashboard-list',
  templateUrl: './apartment-dashboard-list.component.html',
  styleUrl: './apartment-dashboard-list.component.css'
})
export class ApartmentDashboardListComponent implements OnChanges {

  constructor(
    private dataService: BlApartmentDashboardDataService,
    private authService: AuthService
  ) { }

  @Input() data: IPaginatedResponse<IApartment>;
  public apartmentsData: IApartment[] = [];
  isLoggedIn: boolean = this.authService.isLoggedIn();


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.apartmentsData = this.data.data;
    }
  }

  onPageChange(page: number): void {
    this.dataService.pageChanged.next(page);
  }

}
