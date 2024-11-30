import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IPaginatedResponse } from '../../../../core/interfaces/i-base';
import { IApartment } from '../../../interfaces/i-apartment';

@Component({
  selector: 'app-apartment-dashboard-grid',
  templateUrl: './apartment-dashboard-grid.component.html',
  styleUrl: './apartment-dashboard-grid.component.css'
})
export class ApartmentDashboardGridComponent implements OnChanges{

  @Input() data: IPaginatedResponse<IApartment>;

  ngOnChanges(): void {
      console.log(this.data);
      
  }
}
