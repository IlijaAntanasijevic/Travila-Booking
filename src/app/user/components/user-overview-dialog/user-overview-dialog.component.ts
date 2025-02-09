import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BlUserRequestsService } from '../../services/requests/bl-user-requests.service';
import { AuthService } from '../../../auth/services/shared/auth.service';
import { IUser } from '../../interfaces/i-user';
import { IUserOverviewLinks } from '../../interfaces/i-user-overview-links';
import { USER_OVERVIEW_LINKS } from '../../consts/user-overview-links';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-overview-dialog',
  templateUrl: './user-overview-dialog.component.html',
  styleUrl: './user-overview-dialog.component.css'
})
export class UserOverviewDialogComponent implements OnInit, OnDestroy {

  constructor(
    private userRequestService: BlUserRequestsService,
    private dialogRef: MatDialogRef<UserOverviewDialogComponent>,
    private authService: AuthService,
    private router: Router
  ) { }

  userData: IUser = null;
  userLinks: IUserOverviewLinks[] = USER_OVERVIEW_LINKS;
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.userData = this.userRequestService.getUserDataFromLS();

    this.subscription.add(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          this.close();
        }
      })
    )
  }

  logout(): void {
    this.authService.logout();
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
