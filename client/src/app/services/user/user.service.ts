import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environments";
import {UserModel} from "../../models/user-model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponseUser} from "../../models/api-response.model";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {FormGroup} from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private router: Router) { }

  private _loggedIn = !!sessionStorage.getItem('_token');

  get loggedIn(): boolean {
    return this._loggedIn;
  }


  set loggedIn(value: boolean) {
    this._loggedIn = value;
  }

  registerUser(user: UserModel){
    return this.http.post<ApiResponseUser>(environment.apiUrl+'register',user)
  }

  loginUser(user: any): Observable<ApiResponseUser>{
   return this.http.post<ApiResponseUser>(environment.apiUrl+'login',user);
  }
  logOutUser(){
    sessionStorage.clear();
    this.loggedIn = false;
    Swal.fire({
      icon: "success",
      title: "User has been successfully logged out!",
      showConfirmButton: false,
      background: '#424b5a',
      color: '#fafafa',
      timer: 1500
    })
    this.router.navigate(['']);
  }
  updateUser(user: UserModel){

  }
  deleteUser(user: UserModel){

  }

  sendMessageToSupport(formData: FormGroup): Observable<any>{
    return this.http.post(environment.apiUrl+'support',formData.value);
  }

  storeUserInStorage(user: UserModel){}
  removeUserFromStorage(user: UserModel){}
}
