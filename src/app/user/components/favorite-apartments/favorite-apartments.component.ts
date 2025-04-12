import { Component, OnInit } from '@angular/core';
import { BlFavoriteApartmentsRequestsService } from './services/requests/bl-favorite-apartments-requests.service';
import { IPaginatedResponse } from '../../../core/interfaces/i-base';
import { Spinner } from '../../../core/functions/spinner';
import { BehaviorSubject } from 'rxjs';
import { IApartment } from '../../../apartment/interfaces/i-apartment';

@Component({
  selector: 'app-favorite-apartments',
  templateUrl: './favorite-apartments.component.html',
  styleUrl: './favorite-apartments.component.css'
})
export class FavoriteApartmentsComponent implements OnInit {

  constructor(
    private requestsService: BlFavoriteApartmentsRequestsService
  ) { }

  data: IPaginatedResponse<IApartment> = null;
  pageChanged: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  ngOnInit(): void {
    this.getData();

    this.pageChanged.subscribe({
      next: (data) => {
        if (data != this.data?.currentPage) {
          //samo zbog testiranja, trenutno ne radi
          this.getData();
        }
      }
    })
  }

  getData(): void {
    Spinner.show();
    this.requestsService.test().subscribe({
      next: (data) => {
        this.data = data;
        Spinner.hide();
      },
      error: err => Spinner.hide()
    })
  }

  remove(apartmentId: number): void {
    this.requestsService.removeFromFavorite(apartmentId).subscribe({
      next: (data) => {

      },
      error: (error) => {

      }
    })
  }

  onPageChange(page: number): void {
    this.pageChanged.next(page);
  }

}
