import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Spinner } from '../../../../../core/functions/spinner';
import { ImageType } from '../../../../../shared/helpers/image-url.pipe';
import { IUser } from '../../../../interfaces/i-user';
import { IReservation } from '../../interfaces/i-reservation';
import { BlBookingsRequestsService } from '../../services/requests/bl-bookings-requests.service';
import { ReservationInfoDialogComponent } from '../reservation-info-dialog/reservation-info-dialog.component';

@Component({
  selector: 'app-guest-bookings',
  standalone: false,
  templateUrl: './guest-bookings.component.html',
  styleUrl: './guest-bookings.component.css'
})
export class GuestBookingsComponent implements OnInit, AfterViewInit {
 constructor(
    private bookingRequestsService: BlBookingsRequestsService,
    private matDialog: MatDialog
  ) { }

  public reservationData: IReservation;
  public disabledButtons: { [key: number]: boolean } = {};
  displayedColumns: string[] = ['image', 'apartmentName', 'checkIn', 'totalGuests', 'paymentMethod', 'totalPrice', 'cancel', 'info'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private _liveAnnouncer = inject(LiveAnnouncer);
  imageType = ImageType;

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit(): void {
      if (this.dataSource) {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  }

  getData(): void {
    Spinner.show();
    this.bookingRequestsService.getMyGuests().subscribe({
      next: (data) => {
        this.reservationData = data;
        this.dataSource = new MatTableDataSource(this.reservationData.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.reservationData.data.forEach(reservation => {
          this.disabledButtons[reservation.bookingId] = this.disableCancelationButton(reservation.bookingId);
        });
        Spinner.hide();
      },
      error: err => Spinner.hide()
    })
  }

  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  showGuestInfo(guest: IUser): void {
    this.matDialog.open(ReservationInfoDialogComponent, {
      width: '700px',
      height: 'auto',
      data: {
        user: guest,
        isMyBookings: false
      }
    });
  }

  cancelBooking(bookingId: number): void {
    alert("TU")
  }

  disableCancelationButton(bookingId: number): boolean {
    const booking = this.reservationData.data.find(x => x.bookingId === bookingId);
    if (!booking) return true;
    const today = new Date().toISOString().split('T')[0];
    return new Date(booking.checkIn) <= new Date(today);
  }
}
