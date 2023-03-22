import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { mockLogin } from '../mocks/user.mosks';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private adminAuth: boolean;

  constructor() {
    this.adminAuth = false;
  }

  setAdminAuth(adminAuth: boolean): void{
    this.adminAuth = adminAuth;
  }
  
  getAdminAuth(): boolean{
    return this.adminAuth;
  }

  getLoginUser(): Login{
    return mockLogin;
  }
}
