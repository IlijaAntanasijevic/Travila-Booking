import { AfterViewInit, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BlApartmentDashboardDataService } from '../../../apartment/apartment-dashboard/services/shared/bl-apartment-dashboard-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ISearchHomeRequest } from '../../../home/components/home-seach/interfaces/i-search-home';
import { BlBookingRequestsService } from '../../services/requests/bl-booking-requests.service';
import { Spinner } from '../../../core/functions/spinner';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IApartmentDetail } from '../../../apartment/interfaces/i-apartment';
import { ILocationCoordinates } from '../../../shared/components/map/i-map';

@Component({
  selector: 'app-book-apartment',
  standalone: false,
  templateUrl: './book-apartment.component.html',
  styleUrl: './book-apartment.component.css'
})
export class BookApartmentComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    private apartmentDashboardDataService: BlApartmentDashboardDataService,
    private router: Router,
    private route: ActivatedRoute,
    private requestsService: BlBookingRequestsService    
  ) { }



  private subsrcitpion: Subscription = new Subscription();
  private bookingData: ISearchHomeRequest = null;
  public apartmentData: any = null;
  private _formBuilder = inject(FormBuilder);
  public apartmentId: number;
  selectedCoordinates: ILocationCoordinates = {
      latitude: 0,
      longitude: 0 
  };

  firstFormGroup = this._formBuilder.group({
    countryCity: [{disabled: true, value: ''}],
    price: [{disabled: true, value: ''}],
    checkIn: [{disabled: true, value: null}],
    checkOut: [{disabled: true, value: null}],
    totalGuests: [{disabled: true, value: 0}],
    totalNights: [{disabled: true, value: 0}],
  });

  secondFormGroup = this._formBuilder.group({
    apartmentName: [{disabled: true, value: ''}],
    type: [{disabled: true, value: ''}],
    features: [{disabled: true, value: ''}],
    mainImage: [{disabled: true, value: ''}],
    pricePerNight: [{disabled: true, value: ''}],
    totalRooms: [{disabled: true, value: ''}],
    totalBookings: [{disabled: true, value: ''}],
  });

  ngOnInit(): void {
    Spinner.show();
      this.route.paramMap.subscribe(params => {
      this.apartmentId = Number(params.get("id"));
      if (isNaN(this.apartmentId)) {
        this.router.navigate(["/404"])
        return;
      }

    })

    this.apartmentDashboardDataService.searchedData.subscribe({
      next: (data) => {
        if(data){          
          this.bookingData = data;
          this.getApartmentById();
        }
        else {
          this.router.navigate(["/apartments/"+this.apartmentId])
        }
      }
    });
    Spinner.hide();
  }

  ngAfterViewInit(): void {
        this.selectedCoordinates = {
            latitude: this.apartmentData.lattitude,
            longitude: this.apartmentData.longitude
          };
  }

  
  getApartmentById(): void {
    Spinner.show();
    this.subsrcitpion.add(
      this.requestsService.getApartmentById(this.apartmentId).subscribe({
        next: (data) => {
          if(data) {
            this.apartmentData = data;
            this.selectedCoordinates = {
            latitude: this.apartmentData.lattitude,
            longitude: this.apartmentData.longitude
          };
            this.fillForms();
            Spinner.hide();
          }
        },
        error: (err) => Spinner.hide()

      })
    )
  }

  fillForms(): void {
    this.firstFormGroup.patchValue({
      countryCity: this.apartmentData.country.name + ', ' + this.apartmentData.city.name,
      price: (this.calculateTotalNights() * this.apartmentData.pricePerNight).toString(),
      checkIn: new Date(this.bookingData.checkIn).toISOString().split('T')[0],
      checkOut:  new Date(this.bookingData.checkOut).toISOString().split('T')[0],
      totalNights: this.calculateTotalNights(),
      totalGuests: Number(this.bookingData.childrens) + Number(this.bookingData.adults)
    });

    this.secondFormGroup.patchValue({
      apartmentName: this.apartmentData.name,
      type: this.apartmentData.apartmentType,
      features: this.apartmentData.features.map(feature => feature.name).join(', '),
      mainImage: this.apartmentData.mainImage.fileName,
      totalRooms: '999',
      pricePerNight: this.apartmentData.pricePerNight,
      totalBookings: this.apartmentData.totalBookings,
    });
  }

    calculateTotalNights(): number {
      let checkIn = this.bookingData.checkIn
      let checkOut = this.bookingData.checkOut
      let totalNights = 0;
    if (checkIn !== null && checkOut !== null) {
      const dateDifference = new Date(checkOut).getTime() - new Date(checkIn).getTime();
      totalNights = dateDifference / (1000 * 60 * 60 * 24);
    }  
    
    return totalNights;
  }

  ngOnDestroy(): void {
    this.subsrcitpion.unsubscribe();
  }



}
