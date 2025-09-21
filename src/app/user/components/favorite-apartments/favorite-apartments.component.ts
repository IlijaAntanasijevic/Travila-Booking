import { Component, OnInit } from '@angular/core';
import { BlFavoriteApartmentsRequestsService } from './services/requests/bl-favorite-apartments-requests.service';
import { IPaginatedResponse } from '../../../core/interfaces/i-base';
import { Spinner } from '../../../core/functions/spinner';
import { BehaviorSubject } from 'rxjs';
import { IApartment } from '../../../apartment/interfaces/i-apartment';
import { IPagination } from '../../../shared/interfaces/i-pagination';
import { IMAGE_TYPE } from '../../../shared/helpers/image-url.pipe';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-favorite-apartments',
    templateUrl: './favorite-apartments.component.html',
    styleUrl: './favorite-apartments.component.css',
    standalone: false
})
export class FavoriteApartmentsComponent implements OnInit {

  constructor(
    private requestsService: BlFavoriteApartmentsRequestsService,
    private alertService: ToastrService
  ) { }

  data: IPaginatedResponse<IApartment> = null;
  pageChanged: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  public imageType: IMAGE_TYPE = IMAGE_TYPE.ApartmentMain;
  private pagination: IPagination = {
    page: 1,
    perPage: 9
  }

  ngOnInit(): void {
    this.getData();

    this.pageChanged.subscribe({
      next: (data) => {
        if (data != this.data?.currentPage) {
          this.getData();
        }
      }
    })
  }

  getData(): void {
    Spinner.show();
    this.requestsService.getFavoriteApartments(this.pagination.page, this.pagination.perPage).subscribe({
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
        this.getData();
        this.alertService.success("Apartment removed from favorites");
      },
      error: (error) => {
        this.alertService.error("Failed to remove apartment from favorites");
      }
    })
  }

  onPageChange(page: number): void {
    this.pagination.page = page;
    this.pageChanged.next(page);
  }

}
