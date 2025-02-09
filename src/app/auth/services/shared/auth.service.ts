import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
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
    return jwtData.Id;
  }

  logout(): void {
    localStorage.removeItem("token");
    this.router.navigateByUrl("/auth/login");
  }
}
