import { Component } from '@angular/core';
import {FormBuilder,FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
 loginForm = this.fb.group({

 })
  constructor(private fb: FormBuilder) {
  }
}
