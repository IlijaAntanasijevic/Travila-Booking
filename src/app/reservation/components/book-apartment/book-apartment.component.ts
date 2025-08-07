import { Component, OnInit } from '@angular/core';
import { BlApartmentDashboardDataService } from '../../../apartment/apartment-dashboard/services/shared/bl-apartment-dashboard-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ISearchHomeRequest } from '../../../home/components/home-seach/interfaces/i-search-home';
import { BlBookingRequestsService } from '../../services/requests/bl-booking-requests.service';
import { Spinner } from '../../../core/functions/spinner';

@Component({
  selector: 'app-book-apartment',
  standalone: false,
  templateUrl: './book-apartment.component.html',
  styleUrl: './book-apartment.component.css'
})
export class BookApartmentComponent implements OnInit {

  constructor(
    private apartmentDashboardDataService: BlApartmentDashboardDataService,
    private router: Router,
    private route: ActivatedRoute,
    private requestsService: BlBookingRequestsService    
  ) { }

  private subsrcitpion: Subscription = new Subscription();
  private bookingData: ISearchHomeRequest = null;

  ngOnInit(): void {

      this.route.paramMap.subscribe(params => {
      const id = Number(params.get("id"));
      if (isNaN(id)) {
        this.router.navigate(["/404"])
        return;
      }

      this.getApartmentById(id);
    })

    this.apartmentDashboardDataService.searchedData.subscribe({
      next: (data) => {
        if(data){
          this.bookingData = data;
        }
      }
    });
  }

  
  getApartmentById(id): void {
    Spinner.show();
    this.subsrcitpion.add(
      this.requestsService.getApartmentById(id).subscribe({
        next: (data) => {
          if(data) {
            console.log(data);
            Spinner.hide();
          }
        },
        error: (err) => Spinner.hide()

      })
    )
  }


}
