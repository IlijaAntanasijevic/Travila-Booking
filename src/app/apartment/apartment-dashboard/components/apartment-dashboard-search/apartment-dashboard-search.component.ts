import { Component, Input } from '@angular/core';
import { ISearchHomeRequest } from '../../../../home/components/home-seach/interfaces/i-search-home';

@Component({
  selector: 'app-apartment-dashboard-search',
  templateUrl: './apartment-dashboard-search.component.html',
  styleUrl: './apartment-dashboard-search.component.css'
})
export class ApartmentDashboardSearchComponent {

  @Input() searchedData: ISearchHomeRequest; 
}
