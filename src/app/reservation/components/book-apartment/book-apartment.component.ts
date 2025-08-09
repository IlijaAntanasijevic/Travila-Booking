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
import { ToastrService } from 'ngx-toastr';
import { IApartmentBooking } from '../../interfaces/i-apartment-booking';
import { toUTCDateString } from '../../../core/helpers/utility';
import { AuthService } from '../../../auth/services/shared/auth.service';

@Component({
  selector: 'app-book-apartment',
  standalone: false,
  templateUrl: './book-apartment.component.html',
  styleUrl: './book-apartment.component.css'
})
export class BookApartmentComponent implements OnInit, OnDestroy {

  constructor(
    private apartmentDashboardDataService: BlApartmentDashboardDataService,
    private router: Router,
    private route: ActivatedRoute,
    private requestsService: BlBookingRequestsService,
    private alertService: ToastrService
  ) { }

  private subsrcitpion: Subscription = new Subscription();
  private bookingData: ISearchHomeRequest = null;
  private _formBuilder = inject(FormBuilder);
  apartmentData: any = null;
  apartmentId: number;
  selectedCoordinates: ILocationCoordinates = null;
  isBookingBtnDisabled: boolean = false;


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
    pricePerNight: [{disabled: true, value: ''}],
    totalRooms: [{disabled: true, value: ''}],
    totalBookings: [{disabled: true, value: ''}],
    address: [{disabled: true, value: ''}],
  });

 thirdFormGroup = this._formBuilder.group({
  ...this.firstFormGroup.controls,
  ...this.secondFormGroup.controls,

  firstName: [{ disabled: true, value: '' }],
  lastName: [{ disabled: true, value: '' }],
  email: [{ disabled: true, value: '' }],
  phone: [{ disabled: true, value: '' }],
  payment: [null, Validators.required],
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
    this.thirdFormGroup.markAsUntouched();
    Spinner.hide();
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
          this.getUserData();  
          this.fillForms();

            Spinner.hide();
          }
        },
        error: (err) => Spinner.hide()

      })
    )
  }

  getUserData(): void {
    this.subsrcitpion.add(
      this.requestsService.getUserData().subscribe({
        next: (data) => {
          if(data) {
            this.thirdFormGroup.patchValue({
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              phone: data.phone
            });
          }
        }
      })
    )
  }

  bookApartment(): void {
    this.thirdFormGroup.markAllAsTouched();
    this.thirdFormGroup.updateValueAndValidity();
    if(this.thirdFormGroup.invalid) {
      this.alertService.error("Please fill all required fields.");
      return;
    }

    Spinner.show();
    let dataToSend: IApartmentBooking = {
      apartmentId: this.apartmentId,
      checkIn: toUTCDateString(new Date(this.bookingData.checkIn)),
      checkOut: toUTCDateString(new Date(this.bookingData.checkOut)),
      totalGuests: Number(this.bookingData.adults) + Number(this.bookingData.childrens),
      paymentId: this.thirdFormGroup.get('payment').value
    }
    this.subsrcitpion.add(
    this.requestsService.createBooking(dataToSend).subscribe({
      next: (data) => {
        this.alertService.success("Booking created successfully.");
        this.isBookingBtnDisabled = true;
        this.apartmentDashboardDataService.isApartmentBooked.next(true);
        this.router.navigate(['/user/reservations']);

        //  setTimeout(() => {
        //     this.router.navigate(['/user/reservations']);
        //  }, 1000);
        Spinner.hide()
      },
      error: err => Spinner.hide()
    })

    )
  }

  viewApartment(): void {
     const url = `/apartments/${this.apartmentId}?from=booking`;
     window.open(url, '_blank');
  }

  fillForms(): void {
    this.firstFormGroup.patchValue({
      countryCity: this.apartmentData.country.name + ', ' + this.apartmentData.city.name,
      price: (this.calculateTotalNights() * this.apartmentData.pricePerNight).toString() + "$",
      // checkIn: new Date(this.bookingData.checkIn).toISOString().split('T')[0],
      // checkOut:  new Date(this.bookingData.checkOut).toISOString().split('T')[0],
      checkIn: new Date(this.bookingData.checkIn).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit',  year: 'numeric'}),
      checkOut: new Date(this.bookingData.checkOut).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit',  year: 'numeric'}),
      totalNights: this.calculateTotalNights(),
      totalGuests: Number(this.bookingData.childrens) + Number(this.bookingData.adults)
    });

    this.secondFormGroup.patchValue({
      apartmentName: this.apartmentData.name,
      type: this.apartmentData.apartmentType,
      features: this.apartmentData.features.map(feature => feature.name).join(', '),
      totalRooms: '999',
      pricePerNight: this.apartmentData.pricePerNight + '$',
      totalBookings: this.apartmentData.totalBookings,
      address: this.apartmentData.address,
    });

    this.thirdFormGroup.patchValue({
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
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
