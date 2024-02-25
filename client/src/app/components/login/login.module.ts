import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginFormComponent } from "./login-form/login-form.component";
import { LoginComponent } from "./login.component";

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginFormComponent,
  ]
})
export class LoginModule { }
