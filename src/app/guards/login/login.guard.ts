import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from 'src/app/module/login/services/token/token.service';
/**
 * Los guards se implementan para ser inyectandos por lo tanto tenemos que usar la etiqueta @Inyectable, como si fueran Servicios en Angular.

Los guards devuelven true o false para permitir el paso o no de un usuario a la ruta. También pueden devolver un Observale o una Promise si el guard no puede responser inmediatamente y tiene que esperar.
 */
@Injectable(
  {
    providedIn: 'root'
  }
)
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    protected _tokenService: TokenService
  ) {

  }
  canActivate(): boolean {
    const token = this._tokenService.getToken();
    if (token) {
      return true;
    }else{
      this.router.navigate(['/login'])
      return false;
    }
  }
}
