import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlApartmentDashboardDataService } from '../../../apartment/apartment-dashboard/services/shared/bl-apartment-dashboard-data.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-reservations',
    templateUrl: './reservations.component.html',
    styleUrl: './reservations.component.css',
    standalone: false
})
export class ReservationsComponent implements OnInit, OnDestroy {

    constructor(
        private dataService: BlApartmentDashboardDataService
    ) { }

    public selectedTabIndex: number = 0;
    private subscription: Subscription = new Subscription();

    ngOnInit(): void {
        this.subscription.add(
            this.dataService.isApartmentBooked.subscribe({
                next: (isBooked) => {
                    if (isBooked) {
                        this.selectedTabIndex = 1;
                    } else {
                        this.selectedTabIndex = 0;
                    }
                }
            })
        )

    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
