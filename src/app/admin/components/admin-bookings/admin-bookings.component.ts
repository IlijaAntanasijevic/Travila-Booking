import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Spinner } from '../../../core/functions/spinner';
import { AdminUseCases } from '../../../core/consts/use-cases';
import { BlAdminBookingsRequestsService } from './services/requests/bl-admin-bookings-requests.service';
import { IAdminBooking, IAdminBookingFilters } from './services/interfaces/i-admin-bookings';
import { BookingDetailsDialogComponent } from './booking-details-dialog/booking-details-dialog.component';
import { IMAGE_TYPE } from '../../../shared/helpers/image-url.pipe';
import { PermissionService } from '../../../core/services/permission.service';

@Component({
  selector: 'app-admin-bookings',
  standalone: false,
  templateUrl: './admin-bookings.component.html',
  styleUrls: ['./admin-bookings.component.css']
})
export class AdminBookingsComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    private requestsService: BlAdminBookingsRequestsService,
    private dialog: MatDialog,
    private permissionService: PermissionService
  ) {}

  displayedColumns: string[] = ['id', 'apartment', 'owner', 'guest', 'checkIn', 'checkOut', 'guests', 'status', 'total', 'actions'];
  dataSource: MatTableDataSource<IAdminBooking> = new MatTableDataSource<IAdminBooking>([]);
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  filters: IAdminBookingFilters = null;
  selectedOwner: number = 0;
  selectedGuest: number = 0;
  selectedStatus: number = 0;
  selectedCity: number = 0;
  searchText: string = '';

  isInitialized: boolean = false;
  adminUseCases = AdminUseCases;
  private subscription: Subscription = new Subscription();
  imageType = IMAGE_TYPE;

  ngOnInit(): void {
    this.loadFilters();
    this.loadBookings();
    this.isInitialized = true;
  }

  ngAfterViewInit(): void {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  loadFilters(): void {
    if(!this.permissionService.has([AdminUseCases.GetAdminFilters])) return;
    this.subscription.add(
      this.requestsService.getFilters().subscribe({
        next: (data) => 
          { 
            this.filters = data; 
            Spinner.hide(); 
          },
        error: () => Spinner.hide()
      })
    );
  }

  loadBookings(): void {
    if (!this.isInitialized) {
      Spinner.show();
    }
    let query = {
      ownerId: this.selectedOwner || null,
      guestId: this.selectedGuest || null,
      status: this.selectedStatus || null,
      cityId: this.selectedCity || null,
      keyword: this.searchText || null
    } as any;

    this.subscription.add(
      this.requestsService.getAll(query).subscribe({
        next: (data) => {
          this.dataSource = new MatTableDataSource<IAdminBooking>(data);
          if (this.sort) {
            this.dataSource.sort = this.sort;
          }
          Spinner.hide();
        },
        error: () => Spinner.hide()
      })
    );
  }

  applyFilter(): void {
    this.loadBookings();
  }

  getStatusLabel(status: number): string {
    if (status === 1) { return 'Upcoming'; }
    if (status === 2) { return 'Completed'; }
    return 'Canceled';
  }

  openDetails(booking: IAdminBooking): void {
    this.dialog.open(BookingDetailsDialogComponent, {
      width: '800px',
      height: "90vh",
      data: booking
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
