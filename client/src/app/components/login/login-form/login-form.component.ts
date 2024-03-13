import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../../services/user/user.service";
import {catchError} from "rxjs";
import Swal from 'sweetalert2';
import {RecordService} from "../../../services/record/record.service";
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
              private recordService: RecordService,
              private router: Router) {
  }


  onSubmit() {
    if (this.userService.loggedIn){
      Swal.fire({
        icon: "error",
        title: "You are already logged in!",
        showConfirmButton: false,
        background: '#424b5a',
        color: '#fafafa',
        timer: 1500
      })
      return;
    }
    if (this.loginForm.get('email')?.value && this.loginForm.get('password')?.value) {
      this.userService.loginUser(this.loginForm.value)
        .pipe(catchError(() => {
          this.userService.loggedIn = false;
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
            console.log(res)
            this.userService.loggedIn = true;
              sessionStorage.setItem('_token', res.token);
              sessionStorage.setItem('_id', res.user.id);
              sessionStorage.setItem('_user', res.user.email);
              sessionStorage.setItem('balance', res.user.balance.toString());
              sessionStorage.setItem('goal', res.user.savingsGoal.toString());
              sessionStorage.setItem('limit', res.user.budgetLimit.toString());
              this.recordService.user_id =  res.user.id;
              Swal.fire({
                icon: "success",
                title: "User has been successfully logged in!",
                showConfirmButton: false,
                background: '#424b5a',
                color: '#fafafa',
                timer: 1500
              }).then(() => {
                this.router.navigate(['/main/dashboard']);
              });
          }
        });
    }
  }


}
