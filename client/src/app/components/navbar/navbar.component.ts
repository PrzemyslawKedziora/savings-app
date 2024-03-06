import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {UserService} from "../../services/user/user.service";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {


  constructor(public userService: UserService) {
  }
}
