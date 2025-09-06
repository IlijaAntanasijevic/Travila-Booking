import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../../auth/services/shared/auth.service";
import { UserService } from "../../user/services/api/user.service";


@Injectable({
  providedIn: "root"
})

export class AuthGuard {

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isLoggedIn = this.authService.isLoggedIn();

    if (!isLoggedIn) {
      this.router.navigateByUrl("/auth/login")
    }


    // const user = this.userService.getUserFromLocalStorage();
    // if (user != null) {
    //   return this.userService.fetchUserInfoObservable().pipe(
    //     map(() => true),
    //     catchError(() => {
    //       this.router.navigate(['/auth/login']);
    //       return of(false);
    //     })
    //   );
    // }
    return isLoggedIn;
  }


}
