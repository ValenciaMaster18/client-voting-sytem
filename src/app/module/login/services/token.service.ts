import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  setToken(token: string): void{
    setCookie('idToken', token, { expires: 365 });
  }

  getToken(): string | undefined{
    const token = getCookie('idToken');
    return token;
  }
  removeToken(){
    removeCookie('idToken');
  }
}
