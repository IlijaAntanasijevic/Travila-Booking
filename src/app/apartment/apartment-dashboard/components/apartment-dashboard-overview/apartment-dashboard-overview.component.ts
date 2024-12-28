import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ApartmentViewMode } from '../../enums/view-mode-enum';
import { BlApartmentDashboardDataService } from '../../services/shared/bl-apartment-dashboard-data.service';
import { BlApartmentsRequestsService } from '../../../services/requests/bl-apartments-requests.service';
import { Spinner } from '../../../../core/functions/spinner';
import { IApartment, IApartmentSearch } from '../../../interfaces/i-apartment';
import { IPaginatedResponse } from '../../../../core/interfaces/i-base';
import { BlApartmentFilterFormService } from '../../services/forms/bl-apartment-filter-form.service';
import { ActivatedRoute } from '@angular/router';
import { ISearchHomeRequest } from '../../../../home/components/home-seach/interfaces/i-search-home';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-apartment-dashboard-overview',
  templateUrl: './apartment-dashboard-overview.component.html',
  styleUrl: './apartment-dashboard-overview.component.css'
})
export class ApartmentDashboardOverviewComponent implements OnInit, OnDestroy {

  constructor(
    private dataService: BlApartmentDashboardDataService,
    private requestsService: BlApartmentsRequestsService,
    private route: ActivatedRoute
  ) { }

  public currentViewMode: ApartmentViewMode = ApartmentViewMode.LIST;
  public ApartmentViewMode = ApartmentViewMode;
  public apartmentsData: IPaginatedResponse<IApartment>;
  private params: IApartmentSearch = {};
  public searchedData: ISearchHomeRequest = null;

  public maxFilterPrice: number;
  public minFilterPrice: number;

  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
   this.subscription.add( 
    this.route.queryParams.subscribe({
    next: (data: ISearchHomeRequest) => {
      if(data && Object.keys(data).length != 0){    
        this.searchedData = data;
        this.params.cityId = data.cityId;
        this.params.checkIn = data.checkIn;
        this.params.checkOut = data.checkOut;
        this.params.childrens = data.childrens;
        this.params.adults = data.adults;
        this.params.rooms = data.rooms;          
    }
    },
    error: (err) => {
      console.log(err);
      
    }
  }));
    this.getData();
    this.trackViewMode();   
    this.trackPageChange();
    this.trackFilterChanges();
  }

  getData(): void {
    Spinner.show();
    this.subscription.add(
      this.requestsService.getAllByQueryParams(this.params).subscribe({
        next: (data) => {
          this.apartmentsData = data;
          this.dataService.totalApartments.next(data.totalCount)
          
          // this.minFilterPrice = data.minPrice;
          // this.maxFilterPrice = data.maxPrice;
          
          this.minFilterPrice = 10;
          this.maxFilterPrice = 120;
  
          Spinner.hide();
        },
        error: (err) => {
          Spinner.hide();
        }
      })
    )
  }

  trackViewMode(): void {
    this.subscription.add(
      this.dataService.viewMode.subscribe({
        next: (data) => {
          this.params.perPage = data === ApartmentViewMode.LIST ? 6 : 9
          this.params.page = 1;   
           this.currentViewMode = data;
           this.getData();
        }
      })
    )
  }

  trackPageChange(): void {
    this.subscription.add(
      this.dataService.pageChanged.subscribe({
        next: (data) => {        
          if(data != this.apartmentsData?.currentPage){
            this.params.page = data;
            this.getData();
  
            window.scrollTo({
              top: 0,
              left: 0
            })
          }
        }
      })
    )
  }

  trackFilterChanges(): void {
    
    
   this.subscription.add(
    this.dataService.filter.subscribe({
      next: (data) => {
        if(data){
          this.params = data;
          if(this.searchedData){
            this.params.cityId = this.searchedData.cityId;
            this.params.adults = this.searchedData.adults;
            this.params.rooms = this.searchedData.rooms;
            this.params.childrens = this.searchedData.childrens;
            this.params.checkIn = this.searchedData.checkIn;
            this.params.checkOut = this.searchedData.checkOut;
          }
          this.getData();    
        }
      }
    })
   )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
