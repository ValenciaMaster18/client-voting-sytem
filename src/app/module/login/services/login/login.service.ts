import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RutasLogin } from '@environments/routes-production';
import { shareReplay, tap } from 'rxjs';

import { IToken } from '../../models/token.interface';
import { TokenService } from '../token/token.service';
import { checkToken } from 'src/app/interceptor/auth-interceptor.interceptor';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API_URL: string;
  constructor(
    private httpClient: HttpClient,
    private _tokenService: TokenService
  ) {
    this.API_URL = RutasLogin.url;
  }

  login(username: string, password: string) {
    return this.httpClient.post<IToken>(`${this.API_URL}`, { username, password }, { context: checkToken() }).pipe(

      tap(response => {
        this._tokenService.setToken(response.idToken)
      }),
        /**
       para evitar que el receptor de este Observable active accidentalmente múltiples solicitudes POST debido a múltiples suscripciones.
       */
      shareReplay(1)
    );
  }

  logout() {
    this._tokenService.removeToken();
  }
}
