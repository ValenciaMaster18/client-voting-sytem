import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RutasLogin, RutasLogout } from '@environments/routes-production';
import { shareReplay, tap } from 'rxjs';

import { IToken } from '../../models/token.interface';
import { TokenService } from '../token/token.service';
import { VotosService } from 'src/app/services/votos/votos.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API_URL: string;
  API_URL_LOGOUT: string;

  constructor(
    private httpClient: HttpClient,
    private _tokenService: TokenService,
    private _votosService: VotosService

  ) {
    this.API_URL = RutasLogin.url;
    this.API_URL_LOGOUT = RutasLogout.url;
  }

  login(username: string, password: string) {
    return this.httpClient.post<IToken>(this.API_URL, { username, password }).pipe(
      tap((response) => {

        this._tokenService.setToken(response.token)
      }),
        /**
       para evitar que el receptor de este Observable active accidentalmente múltiples solicitudes POST debido a múltiples suscripciones.
       */
      shareReplay(1)
    );
  }

  logout() {
    this._tokenService.removeToken();
    return this.httpClient.get(this.API_URL_LOGOUT).subscribe()
  }
}
