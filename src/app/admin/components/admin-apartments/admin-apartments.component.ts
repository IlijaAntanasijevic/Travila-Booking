import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlAdminApartmentsRequestsService } from './services/requests/bl-admin-apartments-requests.service';
import { Subscription } from 'rxjs';
import { Spinner } from '../../../core/functions/spinner';
import { ApartmentStatus, IAdminApartmentFiltersData, IAdminApartments, IAdminFiltersRequest } from './services/interfaces/i-admin-apartments';
import { IMAGE_TYPE } from '../../../shared/helpers/image-url.pipe';

@Component({
  selector: 'app-admin-apartments',
  standalone: false,
  templateUrl: './admin-apartments.component.html',
  styleUrl: './admin-apartments.component.css'
})
export class AdminApartmentsComponent implements OnInit, OnDestroy {

  constructor(
    private requestsService: BlAdminApartmentsRequestsService
  ) {}

  private subscription: Subscription = new Subscription();

  filtersData: IAdminApartmentFiltersData = null;
  apartmentsData: IAdminApartments[] = [];
  imageType = IMAGE_TYPE;
  apartmentStatus = ApartmentStatus;

  ngOnInit(): void {
    this.getApartments();
    this.getFilters();
  }

  search: IAdminFiltersRequest = {
    userId: null,
    cityId: null,
    status: null,
    totalBookings: null
  }

  getApartments(): void {
    Spinner.show();
    this.subscription.add(
      this.requestsService.getAllApartments(this.search).subscribe({
        next: (data) => {
          this.apartmentsData = data;
          Spinner.hide();
        },
        error: err => Spinner.hide()
      })
    )
  }

  getFilters(): void {
    Spinner.show();
    this.subscription.add(
      this.requestsService.getAllFilters().subscribe({
        next: (data) => {
          this.filtersData = data;
          Spinner.hide();
        },
        error: err => Spinner.hide()
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  apartments = [
    {
      id: 1,
      name: 'Seaside Retreat',
      city: 'Barcelona',
      pricePerNight: 120,
      ownerName: 'Alice Johnson',
      imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
      totalBookings: 42,
      status: 'active'
    },
    {
      id: 2,
      name: 'Urban Loft',
      city: 'New York',
      pricePerNight: 200,
      ownerName: 'Bob Smith',
      imageUrl: 'https://images.unsplash.com/photo-1505691723518-36a5ac3b2a59?q=80&w=1200&auto=format&fit=crop',
      totalBookings: 8,
      status: 'pending'
    },
    {
      id: 3,
      name: 'Alpine Cabin',
      city: 'Zermatt',
      pricePerNight: 160,
      ownerName: 'Charlie Lee',
      imageUrl: 'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?q=80&w=1200&auto=format&fit=crop',
      totalBookings: 0,
      status: 'deleted'
    },
    {
      id: 4,
      name: 'Riverside Flat',
      city: 'London',
      pricePerNight: 150,
      ownerName: 'Alice Johnson',
      imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop',
      totalBookings: 15,
      status: 'active'
    },
    {
      id: 5,
      name: 'Desert Villa',
      city: 'Dubai',
      pricePerNight: 300,
      ownerName: 'Bob Smith',
      imageUrl: 'https://images.unsplash.com/photo-1505691723518-43e4b0eaa0e1?q=80&w=1200&auto=format&fit=crop',
      totalBookings: 75,
      status: 'active'
    }
  ];

  owners = Array.from(new Set(this.apartments.map(a => a.ownerName)));
  cities = Array.from(new Set(this.apartments.map(a => a.city)));
  statuses = ['active', 'pending', 'deleted'];

  selectedOwner: string | 'any' = 'any';
  selectedCity: string | 'any' = 'any';
  selectedStatus: string | 'any' = 'any';
  minBookings: number | 'any' = 'any';

  bookingThresholdOptions = [
    { label: 'Any', value: 'any' as const },
    { label: '0+', value: 0 },
    { label: '10+', value: 10 },
    { label: '25+', value: 25 },
    { label: '50+', value: 50 }
  ];

  get filteredApartments() {
    return this.apartments.filter(a => {
      const ownerOk = this.selectedOwner === 'any' || a.ownerName === this.selectedOwner;
      const cityOk = this.selectedCity === 'any' || a.city === this.selectedCity;
      const statusOk = this.selectedStatus === 'any' || a.status === this.selectedStatus;
      const bookingsOk = this.minBookings === 'any' || a.totalBookings >= (this.minBookings as number);
      return ownerOk && cityOk && statusOk && bookingsOk;
    });
  }
}
