import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { IApartmentType } from '../../interfaces/i-settings';
import { Subscription } from 'rxjs';
import { BlAdminSettingsRequestsService } from '../../services/requests/bl-admin-settings-requests.service';

@Component({
  selector: 'app-add-apartment-type-dialog',
  standalone: false,
  templateUrl: './add-apartment-type-dialog.component.html',
  styleUrls: ['./add-apartment-type-dialog.component.css']
})
export class AddApartmentTypeDialogComponent implements OnInit, OnDestroy{

    constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddApartmentTypeDialogComponent>,
    private requestsService: BlAdminSettingsRequestsService,
    @Inject(MAT_DIALOG_DATA) public data: { apartmentType?: IApartmentType }
  ) { }

  isEditMode: boolean = false;
  dialogTitle: string = 'Add New Apartment Type';
  private subscription: Subscription = new Subscription();

  form = this.fb.group({
    name: ['', Validators.required],
    icon: ['home'],
    isActive: [true]
  });

  ngOnInit(): void {
    this.isEditMode = !!this.data?.apartmentType;
    this.dialogTitle = this.isEditMode ? 'Edit Apartment Type' : 'Add New Apartment Type';
    if (this.isEditMode && this.data.apartmentType) {
      this.form.patchValue({
        name: this.data.apartmentType.name,
        icon: this.data.apartmentType.icon,
        isActive: this.data.apartmentType.isActive
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    let apartmentType: IApartmentType = {
      id: this.data?.apartmentType?.id || 0,
      name: this.form.value.name || '',
      icon: this.form.value.icon || 'home',
      isActive: this.form.value.isActive ?? true
    };
    
    if(this.isEditMode){
      this.subscription.add(
        this.requestsService.updateApartmentType(apartmentType).subscribe({
          next: (data) => {
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
        this.requestsService.addApartmentType(apartmentType).subscribe({
          next: (data) => {
            this.dialogRef.close(true);
          },
          error: (err) => {
            this.dialogRef.close(false);
          }
        })
      )
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
