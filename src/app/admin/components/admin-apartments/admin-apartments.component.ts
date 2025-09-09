import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlAdminApartmentsRequestsService } from './services/requests/bl-admin-apartments-requests.service';
import { Subscription } from 'rxjs';
import { Spinner } from '../../../core/functions/spinner';
import { ApartmentStatus, IAdminApartmentFiltersData, IAdminApartments, IAdminFiltersRequest } from './services/interfaces/i-admin-apartments';
import { IMAGE_TYPE } from '../../../shared/helpers/image-url.pipe';
import { MatDialog } from '@angular/material/dialog';
import { ApartmentDetailsDialogComponent } from './apartment-details-dialog/apartment-details-dialog.component';

@Component({
  selector: 'app-admin-apartments',
  standalone: false,
  templateUrl: './admin-apartments.component.html',
  styleUrl: './admin-apartments.component.css'
})
export class AdminApartmentsComponent implements OnInit, OnDestroy {

  constructor(
    private requestsService: BlAdminApartmentsRequestsService,
    private dialog: MatDialog
  ) {}

  selectedOwner: number  = 0;
  selectedCity: number  = 0;
  minBookings: number  = 0;
  selectedStatus: number  = 0;

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

  applyFilter(): void {
    this.search = {
      userId: this.selectedOwner,
      cityId: this.selectedCity,
      status: this.selectedStatus,
      totalBookings: this.minBookings
    }

    this.getApartments();
    
  }

  openApartmentDialog(data: IAdminApartments): void {
    const dialogRef = this.dialog.open(ApartmentDetailsDialogComponent, {
      width: '1000px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      data: {
        apartmentId: data.id,
        ownerFullName: data.ownerFullName
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'approved' || result === 'rejected') {
        this.getApartments();
      }
    });
  }

  approveApartment(apartment: IAdminApartments): void {
    console.log('Approving apartment:', apartment.id);
  }

  rejectApartment(apartment: IAdminApartments): void {
    console.log('Rejecting apartment:', apartment.id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
