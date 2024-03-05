import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../services/user/user.service";
import Swal from "sweetalert2";

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);
  if (userService.loggedIn){
    return true;
  }
  Swal.fire({
    icon: "error",
    title: "Please,log in first.",
    showConfirmButton: false,
    background: '#424b5a',
    color: '#fafafa',
    timer: 1500
  });
  router.navigate(['']);
  return false;
};
export const canLoad: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);
  console.log(userService.loggedIn)
  if (userService.loggedIn){
    router.navigate(['/main/dashboard']);
    return true;
  }
  return false;
};



