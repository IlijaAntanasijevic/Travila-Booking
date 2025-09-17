import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminUseCases } from '../../../../core/consts/use-cases';
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

  allUseCases = this.createUseCasesWithSplitLabels();
  userAdminUseCases: number[] = [];
  userAllUseCases: number[] = []; 
  selectedAdminUseCases: number[] = []; 
  private subscription: Subscription = new Subscription();
  
  ngOnInit(): void {
    this.getUserUseCases();
  }

  getUserUseCases(): void {
    this.subscription.add(
      this.requestsService.getUserUseCases(this.userdId).subscribe({
        next: (data) => {
          this.userAllUseCases = [...data];
          this.userAdminUseCases = data.filter((id: number) => 
            this.allUseCases.some(uc => uc.id === id)
          );
          
          this.selectedAdminUseCases = [...this.userAdminUseCases];
        }
      })
    )
  }

  save(): void {
    const nonAdminUseCases = this.userAllUseCases.filter(id => 
      !this.allUseCases.some(uc => uc.id === id)
    );
    
    const allUseCasesToSend = [...nonAdminUseCases, ...this.selectedAdminUseCases];
    
    this.subscription.add(
      this.requestsService.updateUserUseCases(this.userdId, allUseCasesToSend).subscribe({
        next: () => {
          this.alertService.success("User use cases updated successfully.");
          this.dialogRef.close(true);
        },
        error: () => {
          this.alertService.error("Failed to update user use cases. Please try again.");
        }
      })
    )
  }

  private createUseCasesWithSplitLabels(): { id: number, label: string }[] {
    const useCases: { id: number, label: string }[] = [];
    Object.entries(AdminUseCases).forEach(([key, value]) => {
      if (typeof value === 'number' && value !== AdminUseCases.AdminSettings) {
        const splitLabel = key.split(/(?=[A-Z])/).join(' ');
        useCases.push({ id: value, label: splitLabel });
      }
    });
    
    return useCases;
  }

  close(): void {
    this.dialogRef.close(false);
  }

  onSelectChange(evt: any): void {
    this.selectedAdminUseCases = evt.value || [];
  }

  removeUseCase(useCaseId: number): void {
    this.selectedAdminUseCases = this.selectedAdminUseCases.filter(id => id !== useCaseId);
  }

  getSelectedUseCases(): any[] {
    return this.allUseCases.filter(uc => this.selectedAdminUseCases.includes(uc.id));
  }

  hasAdminUseCases(): boolean {
    return this.selectedAdminUseCases.length > 0;
  }

  getExistingUseCases(): any[] {
    return this.allUseCases.filter(uc => 
      this.selectedAdminUseCases.includes(uc.id) && this.userAdminUseCases.includes(uc.id)
    );
  }

  getNewlySelectedUseCases(): any[] {
    return this.allUseCases.filter(uc => 
      this.selectedAdminUseCases.includes(uc.id) && !this.userAdminUseCases.includes(uc.id)
    );
  }

  isExistingUseCase(useCaseId: number): boolean {
    return this.userAdminUseCases.includes(useCaseId);
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}


