import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule

  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  isSubmitted = false;
  loginForm = this.fb.group({
    email: ['',Validators.required],
    password: ['',Validators.required]
  })
  constructor(private fb: FormBuilder,
              private http: HttpClient) {
  }
  onSubmit(){
    if(this.loginForm.get('email')?.value && this.loginForm.get('password')?.value){
      this.http.post('google.com',this.loginForm.value).pipe().subscribe((res)=>{
        console.log(res);
      })
    }
    console.log(
      this.loginForm.value
    )
  }
}
