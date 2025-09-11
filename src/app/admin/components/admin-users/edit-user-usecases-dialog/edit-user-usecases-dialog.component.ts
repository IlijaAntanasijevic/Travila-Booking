import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Permission } from '../../../../core/helpers/utility';
import { AdminUseCases, AllUseCases } from '../../../../core/consts/use-cases';
import { ToastrService } from 'ngx-toastr';
import { BlAdminUsersRequestsService } from '../services/requests/bl-admin-users-requests.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-user-usecases-dialog',
  templateUrl: './edit-user-usecases-dialog.component.html',
  styleUrl: './edit-user-usecases-dialog.component.css',
  standalone: false
})
export class EditUserUseCasesDialogComponent implements OnInit, OnDestroy{

  constructor(
    private dialogRef: MatDialogRef<EditUserUseCasesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public userdId: number,
    private alertService: ToastrService,
    private requestsService: BlAdminUsersRequestsService
  ) { }

  allUseCases = Permission.getPermissionIds(AdminUseCases).map(id => ({ id, label: AllUseCases[id] as string }));
  userAdminUseCases: number[] = [];
  selectedUseCases: number[] = [];
  private subscription: Subscription = new Subscription();
  
  ngOnInit(): void {
    this.getUserUseCases();
  }

  getUserUseCases(): void {
    this.subscription.add(
      this.requestsService.getUserUseCases(this.userdId).subscribe({
        next: (data) => {
          this.userAdminUseCases = data.filter((id: number) => 
            this.allUseCases.some(uc => uc.id === id)
          );
          this.selectedUseCases = [...this.userAdminUseCases];
        }
      })
    )
  }

  save(): void {
    this.subscription.add(
      this.requestsService.updateUserUseCases(this.userdId, this.selectedUseCases).subscribe({
        next: () => {
          this.alertService.success("User use cases updated successfully.");
          this.dialogRef.close(true);
        },
        error: () => {
          this.alertService.error("Failed to update user use cases. Please try again.");
        }
      })
    )
    console.log(this.selectedUseCases);
  }

  close(): void {
    this.dialogRef.close(false);
  }

  onSelectChange(evt: any): void {
    this.selectedUseCases = evt.value || [];
  }

  removeUseCase(useCaseId: number): void {
    this.selectedUseCases = this.selectedUseCases.filter(id => id !== useCaseId);
  }

  getSelectedUseCases(): any[] {
    return this.allUseCases.filter(uc => this.selectedUseCases.includes(uc.id));
  }

  hasAdminUseCases(): boolean {
    return this.selectedUseCases.length > 0;
  }

  getExistingUseCases(): any[] {
    return this.allUseCases.filter(uc => 
      this.selectedUseCases.includes(uc.id) && this.userAdminUseCases.includes(uc.id)
    );
  }

  getNewlySelectedUseCases(): any[] {
    return this.allUseCases.filter(uc => 
      this.selectedUseCases.includes(uc.id) && !this.userAdminUseCases.includes(uc.id)
    );
  }

  isExistingUseCase(useCaseId: number): boolean {
    return this.userAdminUseCases.includes(useCaseId);
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}


