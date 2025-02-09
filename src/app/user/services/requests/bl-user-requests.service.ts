import { Injectable } from '@angular/core';
import { UserService } from '../api/user.service';
import { Observable } from 'rxjs';
import { IUser, IUserRequest } from '../../interfaces/i-user';
import { UserAvatarService } from '../../components/profile/services/api/user-avatar.service';
import { AuthService } from '../../../auth/services/shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BlUserRequestsService {

  constructor(
    private userService: UserService,
    private userAvatarService: UserAvatarService,
    private authService: AuthService
  ) { }

  getUserData(id: number): Observable<IUser> {
    return this.userService.getOne(id);
  }

  getUserDataFromLS(): IUser {
    return JSON.parse(localStorage.getItem("user"))
  }

  updateUser(id: number, data: IUserRequest): Observable<any> {
    return this.userService.update(id, data);
  }

  updateUserPhoto(id: number, file: File): Observable<any> {
    return this.userAvatarService.update(id, file);
  }

  setUserDataLS(id: number): void {
    this.getUserData(id).subscribe({
      next: (data) => {
        let { id, ...dataWithoutId } = data;
        localStorage.setItem("user", JSON.stringify(dataWithoutId));
      }
    })
  }
}
