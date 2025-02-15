import { Component, OnInit, signal } from '@angular/core';
import { BlUserRequestsService } from '../../services/requests/bl-user-requests.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/services/shared/auth.service';
import { Spinner } from '../../../core/functions/spinner';
import { BlUserProfileFormService } from './services/form/bl-user-profile-form.service';
import { IUser } from '../../interfaces/i-user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  constructor(
    private userRequestService: BlUserRequestsService,
    private authService: AuthService,
    private formService: BlUserProfileFormService,
    private alertService: ToastrService
  ) { }

  private subscription: Subscription = new Subscription();
  id: number = this.authService.getUserId();

  form = this.formService.getForm();
  user: IUser = null;


  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    Spinner.show();
    this.subscription.add(
      this.userRequestService.getUserData(this.id).subscribe({
        next: (data) => {
          this.user = data;
          this.formService.fillForm(data);
          Spinner.hide();

        },
        error: err => Spinner.hide()
      })
    )
  }

  save(): void {
    if (!this.form.invalid) {
      Spinner.show();
      this.formService.updateUser(this.id).subscribe({
        next: (data) => {
          this.getUserData();
          this.userRequestService.setUserDataLS(this.id);
          Spinner.hide();
          this.alertService.success("Successfully", "Updated");
        },
        error: err => Spinner.hide()
      })
    }
  }

  updateAvatar(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file: File = input.files[0];

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 4 * 1024 * 1024; // 4MB

    if (!allowedTypes.includes(file.type)) {
      this.alertService.error("Only .jpg, .jpeg, and .png are allowed.");
      return;
    }

    if (file.size > maxSize) {
      this.alertService.error("The file is too large. The maximum allowed size is 4MB.");
      return;
    }

    Spinner.show();

    if (input.files && input.files.length > 0) {
      this.userRequestService.updateUserPhoto(this.id, file).subscribe({
        next: (data) => {
          this.getUserData();
          this.userRequestService.setUserDataLS(this.id);
          Spinner.hide()
          this.alertService.success("Successfully", "Changed photo");
        },
        error: (err) => {
          Spinner.hide()
        }
      })
    }
  }

  //View / hide password
  hideOld = signal(true);
  hideNew = signal(true);
  clickEventOldPassword(event: MouseEvent) {
    this.hideOld.set(!this.hideOld());
    event.stopPropagation();
  }

  clickEventNewPassword(event: MouseEvent) {
    this.hideNew.set(!this.hideNew());
    event.stopPropagation();
  }

}
