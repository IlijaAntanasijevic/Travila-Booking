import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../../../core/services/permission.service';
import { Router } from '@angular/router';
import { AdminUseCases } from '../../../core/consts/use-cases';

@Component({
  selector: 'app-admin-redirect',
  standalone: false,
  templateUrl: './admin-redirect.component.html',
  styleUrl: './admin-redirect.component.css'
})
export class AdminRedirectComponent implements OnInit {

  constructor(
    private permissionService: PermissionService,
    private router: Router
  ){}

  ngOnInit(): void {
    let userCases = this.permissionService.getPermissions();
    console.log(userCases);
    console.log("AAAA");
    
    
     let routeMap: { path: string, useCase: AdminUseCases | AdminUseCases[] }[] = [
      { path: 'dashboard', useCase: AdminUseCases.AdminDashboard },
      { path: 'apartments', useCase: AdminUseCases.GetAdminApartments },
      { path: 'users', useCase: AdminUseCases.GetAdminUsers },
      { path: 'bookings', useCase: AdminUseCases.GetBookingsAdmin },
      { path: 'settings', useCase: AdminUseCases.AdminSettings},
      { path: 'reports', useCase: [AdminUseCases.GetUseCaseLogs, AdminUseCases.GetErrorLogs]}
    ];
    
    let target = routeMap.find(r => {
      if (Array.isArray(r.useCase)) {
        return r.useCase.some(useCase => userCases.has(useCase));
      } else {
        return userCases.has(r.useCase);
      }
    });
    console.log(target);
    console.log(routeMap);
    
    if(target) {
      this.router.navigate([`/admin/${target.path}`]);
    } else {
      this.router.navigate([`/404`]);
    }
  }
}
