import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlApartmentsRequestsService } from '../../../services/requests/bl-apartments-requests.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Spinner } from '../../../../core/functions/spinner';
import { Subscription } from 'rxjs';
import { IApartmentDetail, IApartmentImages } from '../../../interfaces/i-apartment';

@Component({
  selector: 'app-apartment-view',
  templateUrl: './apartment-view.component.html',
  styleUrl: './apartment-view.component.css'
})
export class ApartmentViewComponent implements OnInit, OnDestroy{

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestsService: BlApartmentsRequestsService
  ) {}

  public apartment: IApartmentDetail;
  public images: IApartmentImages[] = [];
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get("id"));
      if(isNaN(id)){
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
        console.log(data);
        this.apartment = data;
        this.images.push({
          path: data.mainImage,
          id: 0
        });
        data?.images.forEach((x: string, index: number) => {
          this.images.push({path: x, id: ++index});
        })

        Spinner.hide();
        console.log(this.images);
        
      },
      error: (err) => {
        Spinner.hide();

      }
    })
   )
  }


  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
