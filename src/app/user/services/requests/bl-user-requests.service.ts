import { Injectable } from '@angular/core';
import { UserService } from '../api/user.service';
import { Observable } from 'rxjs';
import { IUser } from '../../interfaces/i-user';

@Injectable({
  providedIn: 'root'
})
export class BlUserRequestsService {

  constructor(
    private userService: UserService
  ) { }

  getUserData(id: number): Observable<IUser> {
    return this.userService.getOne(id);
  }
}
