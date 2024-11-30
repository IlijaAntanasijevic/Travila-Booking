import { Component, OnInit } from '@angular/core';
import { BlApartmentDashboardDataService } from '../../services/shared/bl-apartment-dashboard-data.service';
import { ApartmentViewMode } from '../../enums/view-mode-enum';

@Component({
  selector: 'app-apartment-dashboard-sort',
  templateUrl: './apartment-dashboard-sort.component.html',
  styleUrl: './apartment-dashboard-sort.component.css'
})
export class ApartmentDashboardSortComponent implements OnInit{

  constructor(
    private dataService: BlApartmentDashboardDataService,
  ) { }

  public viewMode = ApartmentViewMode;
  public currentViewMode: ApartmentViewMode = ApartmentViewMode.LIST;

  show: number[] = [10,20,50,100];
  sortBy: any = [
    {
      id: 1,
      name: "Price" 
    },
    {
      id: 2,
      name: "Top Rated" 
    },
    {
      id: 3,
      name: "Most Popular" 
    }
  ]
  selectedShow = 20;

  ngOnInit(): void {
    this.dataService.viewMode.subscribe({
      next: (viewMode) => this.currentViewMode = viewMode
    });
  }

  changeView(view: ApartmentViewMode): void {
    this.currentViewMode = view;        
    this.dataService.viewMode.next(view);
  }

}
