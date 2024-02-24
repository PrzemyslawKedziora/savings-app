import { Injectable } from '@angular/core';
import {UserModel} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

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
