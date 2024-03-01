import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environments";
import {UserModel} from "../../models/user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponseUser} from "../../models/api-response.model";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private _loggedIn = false;

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  set loggedIn(value: boolean) {
    this._loggedIn = value;
  }

  registerUser(user: UserModel){}

  loginUser(user: any): Observable<ApiResponseUser>{
   return this.http.post<ApiResponseUser>(environment.apiUrl+'login',user);
  }
  updateUser(user: UserModel){

  }
  deleteUser(user: UserModel){

  }

  storeUserInStorage(user: UserModel){}
  removeUserFromStorage(user: UserModel){}
}
