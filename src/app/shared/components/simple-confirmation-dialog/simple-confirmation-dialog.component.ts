import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-simple-confirmation-dialog',
    templateUrl: './simple-confirmation-dialog.component.html',
    styleUrl: './simple-confirmation-dialog.component.css',
    standalone: false
})
export class SimpleConfirmationDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title?: string, message?: string }
  ) { }

  title: string;
  message: string;
  readonly dialogRef = inject(MatDialogRef<SimpleConfirmationDialogComponent>);


  ngOnInit(): void {
    this.title = this.data?.title
    this.message = this.data?.message
  }

  closeDialog(state: boolean = false): void {
    this.dialogRef.close(state);
  }
}
