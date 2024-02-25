import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from "./register.component";
import {RegisterFormComponent} from "./register-form/register-form.component";
import {LoginFormComponent} from "../login/login-form/login-form.component";

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterFormComponent,
    LoginFormComponent,
  ]
})
export class RegisterModule { }
