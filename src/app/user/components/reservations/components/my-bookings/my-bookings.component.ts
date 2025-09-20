import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Spinner } from '../../../../../core/functions/spinner';
import { IUser } from '../../../../interfaces/i-user';
import { IReservation, IReservationInfo } from '../../interfaces/i-reservation';
import { BlBookingsRequestsService } from '../../services/requests/bl-bookings-requests.service';
import { ReservationInfoDialogComponent } from '../reservation-info-dialog/reservation-info-dialog.component';
import { IMAGE_TYPE } from '../../../../../shared/helpers/image-url.pipe';
import { IPaginatedResponse } from '../../../../../core/interfaces/i-base';
import { ToastrService } from 'ngx-toastr';
import { SimpleConfirmationDialogComponent } from '../../../../../shared/components/simple-confirmation-dialog/simple-confirmation-dialog.component';

@Component({
  selector: 'app-my-bookings',
  standalone: false,
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent implements OnInit, AfterViewInit {

   constructor(
    private bookingRequestsService: BlBookingsRequestsService,
    private matDialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private alertService: ToastrService
  ) { }

  public reservationData: IReservationInfo[] = [];
  public disabledButtons: { [key: number]: boolean } = {};
  displayedColumns: string[] = ['image', 'apartmentName', 'checkIn', 'totalGuests', 'paymentMethod', 'totalPrice', 'cancel', 'info'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<IReservationInfo>([]);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private _liveAnnouncer = inject(LiveAnnouncer);
  imageType = IMAGE_TYPE;

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

  getData(): void {
    Spinner.show();
    this.bookingRequestsService.getAll().subscribe({
      next: (data) => {
        this.reservationData = data;        
        this.dataSource.data = data;
        this.cdr.detectChanges();
        this.reservationData.forEach(reservation => {
          this.disabledButtons[reservation.bookingId] = this.disableCancelationButton(reservation.bookingId);
        });
        Spinner.hide();
      },
      error: err => Spinner.hide()
    })
  }

  announceSortChange(sortState: any) {
    console.log(sortState);

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  showOwnerInfo(reservation: any): void {
    let isDisabled = this.disabledButtons[reservation.bookingId];
    
    this.matDialog.open(ReservationInfoDialogComponent, {
      width: '700px',
      height: 'auto',
      data: {
        user: reservation.owner,
        isMyBookings: true,
        isDisabled: isDisabled,
      }
    });
  }

  cancelBooking(bookingId: number): void {
    
    let dialogRef = this.matDialog.open(SimpleConfirmationDialogComponent, {
      width: '700px',
      height: 'auto',
      data: {
        title: 'Cancel Booking',
        message: 'Are you sure you want to cancel this booking?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        Spinner.show();
        this.bookingRequestsService.cancelBooking(bookingId).subscribe({
          next: () => {
            Spinner.hide();
            this.getData();
            this.alertService.success('Booking cancelled successfully.');
          },
          error: err => {
            Spinner.hide();
          }
        });
      }
    });
    

  }
  disableCancelationButton(bookingId: number): boolean {
    const booking = this.reservationData.find(x => x.bookingId === bookingId);
    if (!booking) return true;
    const today = new Date().toISOString().split('T')[0];
    return new Date(booking.checkIn) <= new Date(today);
  }
}
