import { Injectable } from '@angular/core';
import {UserModel} from "../../models/user";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private loggedIn = false;

  registerUser(user: UserModel){}

  loginUser(user: UserModel){

  }
  updateUser(user: UserModel){

  }
  deleteUser(user: UserModel){

  }

  storeUserInStorage(user: UserModel){}
  removeUserFromStorage(user: UserModel){}
}
