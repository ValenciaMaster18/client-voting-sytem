import { Injectable } from '@angular/core';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  setToken(token: string): void{
    setCookie('token', token, { expires: 365, path: '/' });
  }

  getToken(): string | undefined{
    const token = getCookie('token');
    return token;
  }
  removeToken(){
    removeCookie('token');
  }
}
