import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { PermissionService } from '../../../core/services/permission.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private permissionService: PermissionService
  ) { }


  getJwtToken(): string {
    return localStorage.getItem("token");
  }

  getJwtTokenData(): any {
    let token = this.getJwtToken();
    let jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(token);
  }

  setJwtToken(data: string): void {
    localStorage.setItem("token", data);
  }

  isLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  getUserId(): number {
    let jwtData = this.getJwtTokenData();
    return Number(jwtData?.Id);
  }

  setPermissions(): void {
    let jwtData = this.getJwtTokenData();
    let useCaseIds: number[] = JSON.parse(jwtData?.UseCaseIds) as number[];
    this.permissionService.setPermissions(useCaseIds);
  }

  logout(): void {
    localStorage.removeItem("token");
    this.router.navigateByUrl("/auth/login");
  }
}
