import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GloballyAllowedUseCases } from '../consts/use-cases';
import { AuthService } from '../../auth/services/shared/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Permission } from '../helpers/utility';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor() { }

  public allowed: BehaviorSubject<Set<number>> = new BehaviorSubject<Set<number>>(new Set());

  setPermissions(useCaseIds: number[]) {
    let globalIds = Permission.getPermissionIds(GloballyAllowedUseCases);
    
    this.allowed.next(new Set(useCaseIds.concat(globalIds)));
  }

  //update permissions?

  has(useCaseIds: number[]): boolean {
    if (this.allowed.value.size === 0) {
      this.loadPermissionsFromToken();
    }
    
    return useCaseIds.some(id => this.allowed.value.has(id));
  }


  private loadPermissionsFromToken(): void {
  let token = localStorage.getItem("token");
  if (!token) return;

  let jwtHelper = new JwtHelperService();
  let jwtData = jwtHelper.decodeToken(token);
  let useCaseIds: number[] = JSON.parse(jwtData?.UseCaseIds) as number[];
  this.setPermissions(useCaseIds);
}
}
