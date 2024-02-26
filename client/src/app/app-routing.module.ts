import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {MainComponent} from "./components/main/main.component";

const routes: Routes = [
  {path: '',component: LoginComponent, pathMatch: "full"},
  {path: 'main',component: LoginComponent},
  {path: 'login',component: LoginComponent},
  {path: 'register',component: RegisterComponent},
  {path: 'dashboard',component: DashboardComponent},
  {path: '**', redirectTo: '/main'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
