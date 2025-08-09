import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { BlApartmentsRequestsService } from '../../../services/requests/bl-apartments-requests.service';
import { IApartment, IApartmentSearch } from '../../../interfaces/i-apartment';
import { Spinner } from '../../../../core/functions/spinner';
import { IPaginatedResponse } from '../../../../core/interfaces/i-base';
import { MatDialog } from '@angular/material/dialog';
import { SimpleConfirmationDialogComponent } from '../../../../shared/components/simple-confirmation-dialog/simple-confirmation-dialog.component';
import { BlAddEditApartmetDataService } from '../../services/data/bl-add-edit-apartmet-data.service';
import { ToastrService } from 'ngx-toastr';
import { ImageType } from '../../../../shared/helpers/image-url.pipe';
import { take } from 'rxjs';

@Component({
    selector: 'app-user-apartment-dashboard',
    templateUrl: './user-apartment-dashboard.component.html',
    styleUrl: './user-apartment-dashboard.component.css',
    standalone: false
})
export class UserApartmentDashboardComponent implements OnInit {

  constructor(
    private requestsService: BlApartmentsRequestsService,
    private dialog: MatDialog,
    private dataService: BlAddEditApartmetDataService,
    private alertService: ToastrService,
  ) { }

  apartments: IPaginatedResponse<IApartment>;
  imageType = ImageType;
  private params: IApartmentSearch = {
    perPage: 9,
    page: 1
  }


  ngOnInit(): void {
    this.getData();

    this.dataService.isSuccessChanged.pipe(take(1)).subscribe({
      next: (data) => {
        if (data == -1) {
          this.alertService.success("Apartment successfully added.");
          this.dataService.isSuccessChanged.next(0);
        }
        else if (data > 0){
          this.alertService.success("Apartment successfully edited.");
          this.dataService.isSuccessChanged.next(0);
        }
      }
    })
    
  }

  getData(): void {
    Spinner.show();
    this.requestsService.getAllByQueryParams(this.params).subscribe({
      next: (data) => {
        this.apartments = data;
        Spinner.hide();
      },
      error: (err) => {
        Spinner.hide();
      }
    })
  }

  onPageChange(page: number): void {
    this.params.page = page;
    this.getData();
    window.scrollTo({ top: 0 });
  }

  archive(id: number): void {
    const dialogRef = this.dialog.open(SimpleConfirmationDialogComponent, {
      width: "400px",
      data: {
        title: "Confirm Archiving",
        message: "Are you sure you want to archive this apartment? It will no longer appear in the listings, but existing reservations will remain valid."
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        alert("Archive:" + id)
      }
    })
  }

  edit(id: number): void {

  }

}
