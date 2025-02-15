import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { charactersOnlyValidator } from '../../../core/validators/characters-only-validator';
import { passwordValidator } from '../../../core/validators/password-validator';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {


  form = new FormGroup({
    text: new FormControl("", Validators.required),
  })

  sendMessage(): void {
    let value = this.form.getRawValue().text;

    alert("SEND: " + value)

  }
}
