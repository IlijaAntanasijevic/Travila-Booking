import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ISearchHomeRequest } from '../../../../home/components/home-seach/interfaces/i-search-home';
import { BehaviorSubject, Subscription } from 'rxjs';
import { BlApartmentDashboardDataService } from '../../services/shared/bl-apartment-dashboard-data.service';

@Component({
    selector: 'app-apartment-dashboard-search',
    templateUrl: './apartment-dashboard-search.component.html',
    styleUrl: './apartment-dashboard-search.component.css',
    standalone: false
})
export class ApartmentDashboardSearchComponent implements OnInit, OnDestroy {

  constructor(
    private apartmentDashboardDataService: BlApartmentDashboardDataService
  ) {}

  @Input() searchedData: ISearchHomeRequest; 

  private subsrcitpion: Subscription = new Subscription();


  ngOnInit(): void {
    if(this.searchedData) {
      this.subsrcitpion.add(
        this.apartmentDashboardDataService.searchedData.next(this.searchedData)
      )
    }
  }

  ngOnDestroy(): void {
    this.subsrcitpion.unsubscribe();
  }
}
