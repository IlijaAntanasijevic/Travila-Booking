import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Route, UrlSegment, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { PermissionService } from '../services/permission.service';

@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivate {

  constructor(
    private permissionService: PermissionService
  ){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    let useCaseIds = route.data['useCaseId'] as number[];
    return this.permissionService.has(useCaseIds);
  }

}