import { Component, signal } from '@angular/core';
import { BlRegisterFormService } from '../../services/forms/bl-register-form.service';
import { FormGroup } from '@angular/forms';
import { IRegister } from '../../interfaces/i-auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(
    private formService: BlRegisterFormService
  ) { }

  public form: FormGroup = this.formService.getForm();

  register(): void {
    let data: IRegister = this.formService.getFormData();

    console.log(data);
    
  }

  fileUpload(event: any): void {

  }

  previewImage(e: any): void {

  }






  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

}
