import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { IApartmentFeature } from '../../interfaces/i-settings';
import { Subscription } from 'rxjs';
import { BlAdminSettingsRequestsService } from '../../services/requests/bl-admin-settings-requests.service';

@Component({
  selector: 'app-add-apartment-feature-dialog',
  standalone: false,
  templateUrl: './add-apartment-feature-dialog.component.html',
  styleUrls: ['./add-apartment-feature-dialog.component.css']
})
export class AddApartmentFeatureDialogComponent implements OnInit, OnDestroy{
    constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddApartmentFeatureDialogComponent>,
    private requestsService: BlAdminSettingsRequestsService,
    @Inject(MAT_DIALOG_DATA) public data: { apartmentFeature?: IApartmentFeature }
  ) { }

  isEditMode: boolean = false;
  dialogTitle: string = 'Add New Apartment Feature';

  form = this.fb.group({
    name: ['', Validators.required],
    icon: ['star'],
    isActive: [true],
  });

  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.isEditMode = !!this.data?.apartmentFeature;
    this.dialogTitle = this.isEditMode ? 'Edit Apartment Feature' : 'Add New Apartment Feature';
    
    if (this.isEditMode && this.data.apartmentFeature) {
      this.form.patchValue({
        name: this.data.apartmentFeature.name,
        icon: this.data.apartmentFeature.icon,
        isActive: this.data.apartmentFeature.isActive
      });
    }
  }

  onSave(): void {
    let apartmentFeature: IApartmentFeature = {
      id: this.data?.apartmentFeature?.id || 0,
      name: this.form.value.name || '',
      icon: this.form.value.icon || 'star',
      isActive: this.form.value.isActive ?? true
    };
    
    if(this.isEditMode){
      this.subscription.add(
        this.requestsService.updateFeature(apartmentFeature).subscribe({
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
        this.requestsService.addFetaure(apartmentFeature).subscribe({
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

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
