import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { BlBookingsRequestsService } from './services/requests/bl-bookings-requests.service';
import { Spinner } from '../../../core/functions/spinner';
import { IReservation } from './interfaces/i-reservation';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent implements OnInit {

  constructor(
    private bookingRequestsService: BlBookingsRequestsService
  ) { }

  public reservationData: IReservation;
  public disabledButtons: { [key: number]: boolean } = {};
  displayedColumns: string[] = ['image', 'apartmentName', 'checkIn', 'totalGuests', 'paymentMethod', 'totalPrice', 'cancel', 'info'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private _liveAnnouncer = inject(LiveAnnouncer);

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    Spinner.show();
    this.bookingRequestsService.getAll().subscribe({
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
    console.log(sortState);

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
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
