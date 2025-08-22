import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlApartmentsRequestsService } from '../../../services/requests/bl-apartments-requests.service';
import { IPaginatedResponse } from '../../../../core/interfaces/i-base';
import { IApartment } from '../../../interfaces/i-apartment';
import { Subscription } from 'rxjs';
import { Spinner } from '../../../../core/functions/spinner';
import { IMAGE_TYPE } from '../../../../shared/helpers/image-url.pipe';

@Component({
  selector: 'app-user-archived-apartments',
  standalone: false,
  templateUrl: './user-archived-apartments.component.html',
  styleUrl: './user-archived-apartments.component.css'
})
export class UserArchivedApartmentsComponent implements OnInit, OnDestroy{

  constructor(
    private requestsService: BlApartmentsRequestsService
  ) {}

  data: IPaginatedResponse<IApartment> = null;
  private subscription: Subscription = new Subscription();
  public imageType = IMAGE_TYPE;

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    Spinner.show();
    this.subscription.add(
      this.requestsService.getArchivedApartments().subscribe({
        next: (data) => {
          this.data = data;
          console.log(data);
          
          Spinner.hide();
        },
        error: err => Spinner.hide()
      })
    )
  }

  onPageChange(page: number): void {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
