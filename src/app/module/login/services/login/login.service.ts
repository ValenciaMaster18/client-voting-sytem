import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RutasPostLogin } from '@environments/login/rutas-dev';
import { shareReplay, tap } from 'rxjs';

import { IToken } from '../../models/token.interface';
import { TokenService } from '../token/token.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient: HttpClient,
    private _tokenService: TokenService
  ) {
  }

  login(username: string, password: string) {
    return this.httpClient.post<IToken>(`${RutasPostLogin.url}/login`, { username, password }).pipe(

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
