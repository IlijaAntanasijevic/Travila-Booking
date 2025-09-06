import { Component, OnInit } from '@angular/core';
import { AdminUseCases } from '../../../core/consts/use-cases';
import { PermissionService } from '../../../core/services/permission.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
  standalone: false
})
export class AdminDashboardComponent {

  constructor(
    private permissionService: PermissionService
  ) { }


}
