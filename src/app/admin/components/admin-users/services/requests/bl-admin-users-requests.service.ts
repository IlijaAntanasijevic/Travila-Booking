import { Injectable } from '@angular/core';
import { AdminUsersService } from '../api/admin-users.service';
import { Observable } from 'rxjs';
import { IAdminUser } from '../interface/i-admin-users';
import { AdminUserUseCasesService } from '../api/admin-user-use-cases.service';

@Injectable({
  providedIn: 'root'
})
export class BlAdminUsersRequestsService {

  constructor(
    private apiService: AdminUsersService,
    private userUseCasesService: AdminUserUseCasesService
  ) { }

  getAll(keyword: string): Observable<IAdminUser[]>{
    let search = keyword ? "keyword=" + keyword : "";
    return this.apiService.getAllByQueryParams(search);
  }

  getUserUseCases(userId: number): Observable<any> {
    return this.userUseCasesService.getOne(userId);
  }
}
