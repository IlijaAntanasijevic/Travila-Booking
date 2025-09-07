import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/shared/auth.service';
import { AdminUseCases } from '../../core/consts/use-cases';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
  standalone: false
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) {}

  userName: string = '';
  adminUseCases = AdminUseCases;
  
  ngOnInit(): void {
    this.userName = this.authService.getJwtTokenData().FirstName;
  }

  logout(): void {
    this.authService.logout();
  }

}
