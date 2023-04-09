import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from 'src/app/module/login/services/token/token.service';
import jwt_decode from 'jwt-decode';
import { IUsuario } from 'src/app/models/ilusuario';
/**
 * Los guards se implementan para ser inyectandos por lo tanto tenemos que usar la etiqueta @Inyectable, como si fueran Servicios en Angular.

Los guards devuelven true o false para permitir el paso o no de un usuario a la ruta. También pueden devolver un Observale o una Promise si el guard no puede responser inmediatamente y tiene que esperar.
 */
@Injectable(
  {
    providedIn: 'root'
  }
)
export class RedirectLogin implements CanActivate {
  constructor(
    private router: Router,
    private _tokenService: TokenService
  ) {

  }

  canActivate(): boolean {
    const token = this._tokenService.getToken();
    console.log(token)
    if (token) {
      const tokenPayload: IUsuario = jwt_decode(token);
      console.log(tokenPayload)
      if (tokenPayload.role == "ROLE_ADMINISTRADOR") {
        this.router.navigate(['/admin'])
        return false;

      } else if (tokenPayload.role == "ROLE_APRENDIZ") {
        this.router.navigate(['/usuario'])
        return false;
      }
    }
    return true;
  }

}
