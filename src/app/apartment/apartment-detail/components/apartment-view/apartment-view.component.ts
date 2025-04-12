import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlApartmentsRequestsService } from '../../../services/requests/bl-apartments-requests.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Spinner } from '../../../../core/functions/spinner';
import { Subscription } from 'rxjs';
import { IApartmenImage, IApartmentDetail, IApartmentImages } from '../../../interfaces/i-apartment';
import { IPaginatedResponse } from '../../../../core/interfaces/i-base';
import { AuthService } from '../../../../auth/services/shared/auth.service';

@Component({
  selector: 'app-apartment-view',
  templateUrl: './apartment-view.component.html',
  styleUrl: './apartment-view.component.css'
})
export class ApartmentViewComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestsService: BlApartmentsRequestsService,
    public authService: AuthService
  ) { }

  private subscription: Subscription = new Subscription();
  apartment: IApartmentDetail;
  images: IApartmentImages[] = [];
  featuresFirstColum: string[];
  featuresSecondColum: string[];
  isLoggedIn: boolean = this.authService.isLoggedIn();

  public TMPPaginatorData: IPaginatedResponse<any> = {
    "data": [],
    "perPage": 3,
    "totalCount": 9,
    "pages": 3,
    "currentPage": 1
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get("id"));
      if (isNaN(id)) {
        this.router.navigate(["/404"])
        return;
      }

      this.getApartmentById(id);

    })
  }


  getApartmentById(id: number) {
    Spinner.show();
    this.subscription.add(
      this.requestsService.getOne(id).subscribe({
        next: (data) => {
          this.apartment = data;
          this.images.push({
            path: data.mainImage.fileName,
            id: 0
          });
          data?.images.forEach((x: IApartmenImage, index: number) => {
            this.images.push({ path: x.fileName, id: ++index });
          })

          console.log(this.images);
          

          let divideFeatures = Math.ceil(data.features.length / 2);
          this.featuresFirstColum = data.features.slice(0, divideFeatures);
          this.featuresSecondColum = data.features.slice(divideFeatures);


          Spinner.hide();
        },
        error: (err) => {
          if (err?.message?.includes('Not Found.')) {
            this.router.navigate(["/404"])
          }
          Spinner.hide();

        }
      })
    )
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
