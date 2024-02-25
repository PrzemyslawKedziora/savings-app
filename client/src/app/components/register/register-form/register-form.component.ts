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
import {RouterLink} from "@angular/router";

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

  constructor(private fb: FormBuilder) {
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

  }}
