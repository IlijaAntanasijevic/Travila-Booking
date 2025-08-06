import { Component, Inject, OnInit } from '@angular/core';
import { IUser } from '../../../../interfaces/i-user';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageType } from '../../../../../shared/helpers/image-url.pipe';

@Component({
    selector: 'app-reservation-info-dialog',
    templateUrl: './reservation-info-dialog.component.html',
    styleUrl: './reservation-info-dialog.component.css',
    standalone: false
})
export class ReservationInfoDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ReservationInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: IUser; isMyBookings: boolean }
  ) { }

  imageType = ImageType;
  

  ngOnInit(): void {
    console.log(this.data);

  }

  close(): void {
    this.dialogRef.close(true);
  }


}
