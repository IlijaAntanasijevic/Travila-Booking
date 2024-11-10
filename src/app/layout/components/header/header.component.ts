import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, NavigationEnd } from '@angular/router';
import { UserOverviewDialogComponent } from '../../../user/user-overview/components/user-overview-dialog/user-overview-dialog.component';
import { AuthService } from '../../../auth/services/shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  constructor(
    private authService: AuthService,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.router.events.forEach((event) => {
      if(event instanceof NavigationEnd){  
        this.isLoggedIn = this.authService.isLoggedIn();
      }
    });
  }

  openProfileDialog(): void {
    this.matDialog.open(UserOverviewDialogComponent, {
      width: "500px",
      height: "100vh",
      position: {
        right: "0px"
      }
    });
    
  }


  logout(): void {
    this.authService.logout();
  }
}
