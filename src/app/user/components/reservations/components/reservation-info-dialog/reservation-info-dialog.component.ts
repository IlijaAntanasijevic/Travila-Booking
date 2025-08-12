import { Component, Inject, OnInit } from '@angular/core';
import { IUser } from '../../../../interfaces/i-user';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageType } from '../../../../../shared/helpers/image-url.pipe';
import { BlMessagesDataService } from '../../../messages/services/shared/bl-messages-data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-reservation-info-dialog',
    templateUrl: './reservation-info-dialog.component.html',
    styleUrl: './reservation-info-dialog.component.css',
    standalone: false
})
export class ReservationInfoDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ReservationInfoDialogComponent>,
    private dataService: BlMessagesDataService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { user: IUser; isMyBookings: boolean, isDisabled: boolean }
  ) { }

  imageType = ImageType;
  

  ngOnInit(): void {
    console.log(this.data);

  }

  close(): void {
    this.dialogRef.close(true);
  }

  sendMessageToUser(): void {
    this.dialogRef.close(true);
    this.dataService.prepareChat.next(this.data.user.id);
    this.router.navigate(['/user/messages']);
// this.router.navigate(['/user/messages']).then(() => {
//   this.dataService.prepareChat.next(this.data.user.id);
// });
    
  }


}
