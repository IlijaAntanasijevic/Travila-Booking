import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BlUserRequestsService } from '../../services/requests/bl-user-requests.service';
import { AuthService } from '../../../auth/services/shared/auth.service';
import { IUser } from '../../interfaces/i-user';
import { IUserOverviewLinks } from '../../interfaces/i-user-overview-links';
import { USER_OVERVIEW_LINKS } from '../../consts/user-overview-links';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminUseCases } from '../../../core/consts/use-cases';
import { Permission } from '../../../core/helpers/utility';
import { PermissionService } from '../../../core/services/permission.service';

@Component({
    selector: 'app-user-overview-dialog',
    templateUrl: './user-overview-dialog.component.html',
    styleUrl: './user-overview-dialog.component.css',
    standalone: false
})
export class UserOverviewDialogComponent implements OnInit, OnDestroy {

  constructor(
    private userRequestService: BlUserRequestsService,
    private dialogRef: MatDialogRef<UserOverviewDialogComponent>,
    private authService: AuthService,
    private router: Router,
    private permissionService: PermissionService
  ) { }

  userData: IUser = null;
  filteredLinks: any[] = [];
  adminUseCases = AdminUseCases;
  userLinks: IUserOverviewLinks[] = USER_OVERVIEW_LINKS;
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.userData = this.userRequestService.getUserDataFromLS();
    this.filterLinks();
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
  private filterLinks(): void {
    this.filteredLinks = this.userLinks.filter(link => {
      if (link.name === "Admin Panel") {
        return this.hasAnyAdminUseCase();
      }
      return true;
    });
  }

  hasAnyAdminUseCase(): boolean {
    const adminUseCaseIds = Permission.getPermissionIds(AdminUseCases);
    console.log(adminUseCaseIds);
    
    return this.permissionService.has(adminUseCaseIds);
  }

  close(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
