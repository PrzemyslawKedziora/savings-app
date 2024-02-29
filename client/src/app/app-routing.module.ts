import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {MainComponent} from "./components/main/main.component";
import {TransactionsComponent} from "./components/transactions/transactions.component";
import {PortfolioComponent} from "./components/portfolio/portfolio.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {SupportComponent} from "./components/support/support.component";

const routes: Routes = [
  {path: '',component: LoginComponent, pathMatch: "full"},
  {path: 'login',component: LoginComponent},
  {path: 'register',component: RegisterComponent},
  {path: 'main',component: MainComponent, children: [
    {path: 'dashboard',component: DashboardComponent},
    {path: 'transactions',component: TransactionsComponent},
    {path: 'portfolio',component: PortfolioComponent},
    {path: 'settings',component: SettingsComponent},
    {path: 'support',component: SupportComponent},
    ]},
  {path: '**', redirectTo: '/login'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
