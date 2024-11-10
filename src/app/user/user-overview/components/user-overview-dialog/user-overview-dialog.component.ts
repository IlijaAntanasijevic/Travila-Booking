import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BlUserRequestsService } from '../../../services/requests/bl-user-requests.service';
import { AuthService } from '../../../../auth/services/shared/auth.service';
import { IUser } from '../../../interfaces/i-user';
import { ImageUtils } from '../../../../core/helpers/utility';
import { ImagePaths } from '../../../../core/consts/image-paths';

@Component({
  selector: 'app-user-overview-dialog',
  templateUrl: './user-overview-dialog.component.html',
  styleUrl: './user-overview-dialog.component.css'
})
export class UserOverviewDialogComponent {

  constructor(
    private userRequestService: BlUserRequestsService,
    private dialogRef: MatDialogRef<UserOverviewDialogComponent>,
    private authService: AuthService
  ) {}

  public userData: IUser = null;
  
  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    let id = this.authService.getUserId();
    
    this.userRequestService.getUserData(id).subscribe({
      next: (data: IUser) => {
        this.userData = data;
        console.log(this.userData);
        
      },
      error: (err) => {
        console.log(err);
        
      }
    })
    
  }


  logout(): void {
    this.authService.logout();
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
