import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlApartmentsRequestsService } from '../../../services/requests/bl-apartments-requests.service';
import { IDefaultPagination, IPaginatedResponse } from '../../../../core/interfaces/i-base';
import { IArchivedApartment } from '../../../interfaces/i-apartment';
import { Subscription } from 'rxjs';
import { Spinner } from '../../../../core/functions/spinner';
import { IMAGE_TYPE } from '../../../../shared/helpers/image-url.pipe';
import { MatDialog } from '@angular/material/dialog';
import { SimpleConfirmationDialogComponent } from '../../../../shared/components/simple-confirmation-dialog/simple-confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-archived-apartments',
  standalone: false,
  templateUrl: './user-archived-apartments.component.html',
  styleUrl: './user-archived-apartments.component.css'
})
export class UserArchivedApartmentsComponent implements OnInit, OnDestroy {

  constructor(
    private requestsService: BlApartmentsRequestsService,
    private dialog: MatDialog,
    private alertService: ToastrService
  ) { }

  data: IPaginatedResponse<IArchivedApartment> = null;
  private subscription: Subscription = new Subscription();
  public imageType = IMAGE_TYPE;
  params: IDefaultPagination = {
    page: 1,
    perPage: 6
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    Spinner.show();
    this.subscription.add(
      this.requestsService.getArchivedApartments(this.params).subscribe({
        next: (data) => {
          this.data = data;
          Spinner.hide();
        },
        error: err => Spinner.hide()
      })
    )
  }

  activateApartment(id: number): void {
    Spinner.show();
    this.subscription.add(
      this.requestsService.activateApartment(id).subscribe({
        next: (data) => {
          Spinner.hide();
          this.alertService.success("Successfully activated");
          this.getData();
        },
       error: err => Spinner.hide()
      })
    )
  }

  onPageChange(page: number): void {
    this.params.page = page;
    this.getData();
    window.scrollTo({ top: 0 });
  }

  deleteApartment(id: number): void {
    const dialogRef = this.dialog.open(SimpleConfirmationDialogComponent, {
      width: "400px",
      data: {
        title: "Confirm Delete",
        message: "Are you sure you want to delete this apartment?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        Spinner.show();
        this.subscription.add(
          this.requestsService.deleteApartment(id).subscribe({
            next: (data) => {
              this.getData();
              this.alertService.success("Successfully deleted");
              Spinner.hide()
            },
            error: err => Spinner.hide()
          })
        )
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
