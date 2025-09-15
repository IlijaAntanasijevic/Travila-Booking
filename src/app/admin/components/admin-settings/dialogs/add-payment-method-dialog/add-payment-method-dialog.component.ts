import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { IPaymentMethod } from '../../interfaces/i-settings';
import { BlAdminSettingsRequestsService } from '../../services/requests/bl-admin-settings-requests.service';
import { Subscription, finalize } from 'rxjs';

@Component({
  selector: 'app-add-payment-method-dialog',
  standalone: false,
  templateUrl: './add-payment-method-dialog.component.html',
  styleUrl: './add-payment-method-dialog.component.css'
})
export class AddPaymentMethodDialogComponent implements OnInit, OnDestroy{
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddPaymentMethodDialogComponent>,
    private requestsService: BlAdminSettingsRequestsService,
    @Inject(MAT_DIALOG_DATA) public data: { paymentMethod?: IPaymentMethod }
  ) { }

  isEditMode: boolean = false;
  dialogTitle: string = 'Add New Payment Method';
  private subscription: Subscription = new Subscription();

  form = this.fb.group({
    name: ['', Validators.required],
    processingFee: [0, [Validators.required, Validators.min(0)]],
    icon: ['payment'],
    isActive: [true]
  });

  ngOnInit(): void {
    this.isEditMode = !!this.data?.paymentMethod;
    this.dialogTitle = this.isEditMode ? 'Edit Payment Method' : 'Add New Payment Method';

    if (this.isEditMode && this.data.paymentMethod) {
      this.form.patchValue({
        name: this.data.paymentMethod.name,
        processingFee: this.data.paymentMethod.processingFee,
        icon: this.data.paymentMethod.icon,
        isActive: this.data.paymentMethod.isActive
      });
    }
  }

  onSave(): void {
    if (this.form.valid) {
      let data: IPaymentMethod = {
        id: this.data.paymentMethod?.id ?? null,
        name: this.form.value.name,
        processingFee: this.form.value.processingFee,
        icon: this.form.value.icon,
        isActive: this.form.value.isActive
      }

      if (this.isEditMode) {
        this.subscription.add(
          this.requestsService.updatePaymentMethod(data).subscribe({
            next: (response) => {
              this.dialogRef.close(true);
            },
            error: (err) => {
              this.dialogRef.close(false);
            }
          })
        )
      }
      else {
        this.subscription.add(
          this.requestsService.addPaymentMethod(data).subscribe({
            next: (response) => {
              this.dialogRef.close(true);
            },
            error: (err) => {
              this.dialogRef.close(false);
            }
          })
        )
      }
    }
  }
  
  onCancel(): void {
    this.dialogRef.close(false);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
