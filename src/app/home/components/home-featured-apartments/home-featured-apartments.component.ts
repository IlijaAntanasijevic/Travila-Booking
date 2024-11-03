import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlHomeFeaturedApartmentsRequestsService } from './services/requests/bl-home-featured-apartments-requests.service';
import { IApartment } from '../../../shared/interfaces/i-apartment';
import { Subscription } from 'rxjs';
import { IPaginatedResponse } from '../../../core/interfaces/i-base';

@Component({
  selector: 'app-home-featured-apartments',
  templateUrl: './home-featured-apartments.component.html',
  styleUrl: './home-featured-apartments.component.css'
})
export class HomeFeaturedApartmentsComponent implements OnInit, OnDestroy{

  constructor(
    private homeFeaturedRequestsService: BlHomeFeaturedApartmentsRequestsService
  ) { }

  public page: number = 1;
  public apartmemts: IApartment[];
  public data: IPaginatedResponse<IApartment> = null;
  private subscription: Subscription = new Subscription();


  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.subscription.add(
      this.homeFeaturedRequestsService.getFeatured(this.page).subscribe({
        next: (data) => {    
          this.data = data;   
          this.page == 1 ? this.apartmemts = this.data.data : this.apartmemts = [...this.apartmemts, ...data.data];
          // setTimeout(() => {
          //   this.page == 1 ? this.apartmemts = this.data.data : this.apartmemts = [...this.apartmemts, ...data.data];
          // },2000)
        },
        error: (err) => {
          console.log(err);
        }
      })
    )
  }

  viewMore(): void {
    this.page++;
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
