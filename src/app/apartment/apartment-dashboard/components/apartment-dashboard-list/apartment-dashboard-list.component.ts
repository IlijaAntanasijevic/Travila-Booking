import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IApartment } from '../../../interfaces/i-apartment';
import { IPaginatedResponse } from '../../../../core/interfaces/i-base';

@Component({
  selector: 'app-apartment-dashboard-list',
  templateUrl: './apartment-dashboard-list.component.html',
  styleUrl: './apartment-dashboard-list.component.css'
})
export class ApartmentDashboardListComponent implements OnInit, OnChanges{
  
  @Input() data: IPaginatedResponse<IApartment>;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.data);
      
  }

}
