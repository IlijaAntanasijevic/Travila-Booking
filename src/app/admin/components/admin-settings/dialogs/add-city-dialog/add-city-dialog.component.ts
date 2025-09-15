import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ICity } from '../../interfaces/i-settings';
import { BlAdminSettingsRequestsService } from '../../services/requests/bl-admin-settings-requests.service';
import { IBase } from '../../../../../core/interfaces/i-base';
import { Subscription } from 'rxjs';
import { Spinner } from '../../../../../core/functions/spinner';

@Component({
  selector: 'app-add-city-dialog',
  standalone: false,
  templateUrl: './add-city-dialog.component.html',
  styleUrls: ['./add-city-dialog.component.css']
})
export class AddCityDialogComponent implements OnInit, OnDestroy{

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddCityDialogComponent>,
    private requestsService: BlAdminSettingsRequestsService,
    @Inject(MAT_DIALOG_DATA) public data: { city?: ICity }
  ) { }

  isEditMode: boolean = false;
  dialogTitle: string = 'Add New City';

  form = this.fb.group({
    name: ['', Validators.required],
    country: [0, Validators.required],
    isActive: [true]
  });

  private subscription: Subscription = new Subscription();

  countries: IBase[] = [];
  cities: IBase[] = [];

  ngOnInit(): void {
    this.isEditMode = !!this.data?.city;
    this.dialogTitle = this.isEditMode ? 'Edit City' : 'Add New City';
    this.getAllCountries();

    if (this.isEditMode && this.data.city) {
      this.form.patchValue({
        name: this.data.city.name,
        country: this.data.city.countryId,
        isActive: this.data.city.isActive
      });
    }
  }

  getAllCountries(): void {
    Spinner.show();
    this.subscription.add(this.requestsService.getAllCountries().subscribe((data) => {
      this.countries = data;
      Spinner.hide();
    }));
  }
  
  onSave(): void {
    if (this.form.valid) {
      let dataToSend: ICity = {
        name: this.form.value.name,
        countryId: this.form.value.country,
        isActive: this.form.value.isActive ?? true
      };

      if(this.isEditMode){
        dataToSend.id = this.data.city.id;
        this.subscription.add(this.requestsService.updateCity(dataToSend).subscribe({
          next: (data) => {
            this.dialogRef.close(true);
          },
          error: (err) => {
            this.dialogRef.close(false);
          }
        }));
      }
      else {
        this.subscription.add(this.requestsService.createCity(dataToSend).subscribe({
          next: (data) => {
            this.dialogRef.close(true);
          },
          error: (err) => {
            this.dialogRef.close(false);
          }
        }));
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
