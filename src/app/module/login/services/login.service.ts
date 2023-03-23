import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RutasPostLogin } from '../environments/rutas-dev';
import { shareReplay, tap } from 'rxjs';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient: HttpClient
  ) {
  }
  /**
   Estamos recibiendo el resultado de la llamada de inicio de sesión, que contiene el JWT y el expiresIn propiedad, y la estamos pasando directamente a la setSession método
   */
  login(username: string, password: string) {
    return this.httpClient.post(`${RutasPostLogin.url}/login`, { username, password }).pipe(
      /**
       para evitar que el receptor de este Observable active accidentalmente múltiples solicitudes POST debido a múltiples suscripciones.
       */
      tap(response => this.setSession(response)),
      shareReplay(1)
    );
  }
  private setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    console.log(authResult)
    console.log(expiresAt)

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  // public isLoggedIn() {
  //   return moment().isBefore(this.getExpiration());
  // }

  // isLoggedOut() {
  //   return !this.isLoggedIn();
  // }

  // getExpiration() {
  //   const expiration: any = localStorage.getItem("expires_at");
  //   const expiresAt = JSON.parse(expiration);
  //   return moment(expiresAt);
  // }
}
