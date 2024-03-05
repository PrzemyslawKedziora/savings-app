import {Component} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../../services/user/user.service";
import {catchError} from "rxjs";
import Swal from "sweetalert2";

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss','../../login/login-form/login-form.component.scss']
})
export class RegisterFormComponent {
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(8), Validators.maxLength(32)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
    },
    {validator: this.validatePasswordConfirmation('password','confirmPassword')}
  )
  }

  validatePasswordConfirmation(controlName: string, matchingControlName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const controlValue = control.get(controlName)?.value;
      const matchingControlValue = control.get(matchingControlName)?.value;

      if (!matchingControlName) {
        return null
      }
      if (controlValue !== matchingControlValue) {
        return {matchValues: true};
      }
      return null;
    };
}
  onSubmit(){
    this.userService.registerUser(this.registerForm.value).pipe(catchError(() => {
      return Swal.fire({
        icon: "error",
        title: "Invalid credentials, please try once again.",
        showConfirmButton: false,
        background: '#424b5a',
        color: '#fafafa',
        timer: 1500
      });
    })).subscribe((res)=>{
      if ('status' in res && res.status) {
        Swal.fire({
          icon: "success",
          title: "User has been successfully signed up!",
          showConfirmButton: false,
          background: '#424b5a',
          color: '#fafafa',
          timer: 2000
        }).then(() => {
          this.router.navigate([''])
        });
      }
    })

  }}
