import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IApartment } from '../../../interfaces/i-apartment';
import { IPaginatedResponse } from '../../../../core/interfaces/i-base';
import { BlApartmentDashboardDataService } from '../../services/shared/bl-apartment-dashboard-data.service';

@Component({
  selector: 'app-apartment-dashboard-list',
  templateUrl: './apartment-dashboard-list.component.html',
  styleUrl: './apartment-dashboard-list.component.css'
})
export class ApartmentDashboardListComponent implements OnInit, OnChanges {

  constructor(
    private dataService: BlApartmentDashboardDataService
  ) { }
  
  @Input() data: IPaginatedResponse<IApartment>;
  public apartmentsData: IApartment[] = [];

  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data'] && changes['data'].currentValue){
      this.apartmentsData = this.data.data;
    }
  }

  onPageChange(page: number): void {
    this.dataService.pageChanged.next(page);
  }

}
