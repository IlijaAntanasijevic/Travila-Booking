import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUseCaseLog } from '../../interfaces/error-log.interface';

@Component({
  selector: 'app-use-case-details-dialog',
  standalone: false,
  templateUrl: './use-case-details-dialog.component.html',
  styleUrl: './use-case-details-dialog.component.css'
})
export class UseCaseDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UseCaseDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUseCaseLog
  ) {}
  
  onClose(): void {
    this.dialogRef.close();
  }
  
  formatData(data: any): string {
    return JSON.stringify(data, null, 2);
  }
}
