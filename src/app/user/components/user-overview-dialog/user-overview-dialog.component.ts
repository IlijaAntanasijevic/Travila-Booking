import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BlUserRequestsService } from '../../services/requests/bl-user-requests.service';
import { AuthService } from '../../../auth/services/shared/auth.service';
import { IUser } from '../../interfaces/i-user';
import { IUserOverviewLinks } from '../../interfaces/i-user-overview-links';
import { USER_OVERVIEW_LINKS } from '../../consts/user-overview-links';

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
  public userLinks: IUserOverviewLinks[] = USER_OVERVIEW_LINKS;

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    let id = this.authService.getUserId();
    
    this.userRequestService.getUserData(id).subscribe({
      next: (data: IUser) => {
        this.userData = data;        
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
