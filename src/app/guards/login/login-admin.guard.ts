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
export class LoginGuardAdmin implements CanActivate {
  constructor(
    private router: Router,
    protected _tokenService: TokenService
  ) {

  }
  canActivate(): boolean {
    const token = this._tokenService.getToken();
    // Json con el token decodificado
    const tokenPayload: IUsuario = jwt_decode(token!);
    if (token && tokenPayload.role == "ROLE_ADMINISTRADOR") {
      return true;
    }else{
      if(token){
        this.router.navigate(['/usuario'])
      }
      return false;
    }
  }
}
