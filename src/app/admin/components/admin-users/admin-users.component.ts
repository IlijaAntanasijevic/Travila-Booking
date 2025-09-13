import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Spinner } from '../../../core/functions/spinner';
import { ToastrService } from 'ngx-toastr';
import { EditUserUseCasesDialogComponent } from './edit-user-usecases-dialog/edit-user-usecases-dialog.component';
import { IMAGE_TYPE } from '../../../shared/helpers/image-url.pipe';
import { IAdminUser } from './services/interface/i-admin-users';
import { BlAdminUsersRequestsService } from './services/requests/bl-admin-users-requests.service';
import { AdminUseCases } from '../../../core/consts/use-cases';

@Component({
  selector: 'app-admin-users',
  standalone: false,
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private alertService: ToastrService,
    private requestsService: BlAdminUsersRequestsService
  ) {}

  users: IAdminUser[] = [];
  searchTerm: string = '';
  imageType = IMAGE_TYPE;
  isInitLoad: boolean = true;
  adminUseCases = AdminUseCases;

  ngOnInit(): void {
    this.loadUsers();
    this.isInitLoad = false;
  }

  loadUsers(): void {
    this.isInitLoad ? Spinner.show() : null;
    this.requestsService.getAll(this.searchTerm).subscribe({
      next: (data: any) => {
        this.users = data;
        Spinner.hide();
      },
      error: () => Spinner.hide()
    });
  }

  onSearchChange(): void {
    this.loadUsers();
  }

  openEditUseCases(user: IAdminUser): void {
    const dialogRef = this.dialog.open(EditUserUseCasesDialogComponent, {
      width: '600px',
      data: user.id
    });
  }
}
