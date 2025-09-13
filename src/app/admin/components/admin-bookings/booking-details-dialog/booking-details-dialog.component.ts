import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IAdminBooking } from '../services/interfaces/i-admin-bookings';
import { IMAGE_TYPE } from '../../../../shared/helpers/image-url.pipe';

@Component({
  selector: 'app-booking-details-dialog',
  templateUrl: './booking-details-dialog.component.html',
  styleUrls: ['./booking-details-dialog.component.css'],
  standalone: false
})
export class BookingDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BookingDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAdminBooking
  ) {}

  imageType = IMAGE_TYPE;

  getStatusLabel(status: number): string {
    if (status === 1) { return 'Active'; }
    if (status === 2) { return 'Pending'; }
    return 'Canceled';
  }

}


