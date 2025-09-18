import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlHomeRequestsService } from '../../services/requests/bl-home-requests.service';
import { Subscription } from 'rxjs';
import { IHomeStats } from '../../services/interfaces/i-home-stats';

@Component({
  selector: 'app-home-travel-stats',
  templateUrl: './home-travel-stats.component.html',
  styleUrls: ['./home-travel-stats.component.css'],
  standalone: false
})
export class HomeTravelStatsComponent implements OnInit, OnDestroy {

  constructor(
    private homeRequestsService: BlHomeRequestsService
  ) { }

  private subscription: Subscription = new Subscription();

  data: IHomeStats = null;

  ngOnInit(): void {
    this.getStats();
  }

  getStats(): void {
    this.subscription.add(
      this.homeRequestsService.getHomeStats().subscribe({
        next: (data) => {
          this.data = data;
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
