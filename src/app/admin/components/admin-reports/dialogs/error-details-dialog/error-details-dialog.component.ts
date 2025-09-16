import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IErrorLog } from '../../interfaces/error-log.interface';

@Component({
  selector: 'app-error-details-dialog',
  standalone: false,
  templateUrl: './error-details-dialog.component.html',
  styleUrl: './error-details-dialog.component.css'
})
export class ErrorDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrorDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IErrorLog
  ) {}
  
  onClose(): void {
    this.dialogRef.close();
  }
  
  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString();
  }
}
