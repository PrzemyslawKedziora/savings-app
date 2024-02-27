import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../../services/user/user.service";
import {catchError} from "rxjs";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink

  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent{

  isSubmitted = false;
  loginForm = this.fb.group({
    email: ['',Validators.required],
    password: ['',Validators.required]
  })
  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) {
  }


  onSubmit() {
    if (this.loginForm.get('email')?.value && this.loginForm.get('password')?.value) {
      this.userService.loginUser(this.loginForm.value)
        .pipe(catchError(() => {
          return Swal.fire({
            icon: "error",
            title: "Invalid email or password",
            showConfirmButton: false,
            background: '#424b5a',
            color: '#fafafa',
            timer: 1500
          });
        }))
        .subscribe((res) => {
          if ('status' in res && res.status) {
              this.userService.loggedIn = true;
              sessionStorage.setItem('_token', res.data);
              Swal.fire({
                icon: "success",
                title: "User has been successfully logged in!",
                showConfirmButton: false,
                background: '#424b5a',
                color: '#fafafa',
                timer: 1500
              }).then(() => {
                this.router.navigate(['/dashboard']);
              });
          }
        });
    }
  }


}
