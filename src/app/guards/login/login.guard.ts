import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/module/login/services/login.service';
/**
 * Los guards se implementan para ser inyectandos por lo tanto tenemos que usar la etiqueta @Inyectable, como si fueran Servicios en Angular.

Los guards devuelven true o false para permitir el paso o no de un usuario a la ruta. También pueden devolver un Observale o una Promise si el guard no puede responser inmediatamente y tiene que esperar.
 */
@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private _loginServices: LoginService,
    private router: Router
  ) {

  }
  canActivate(): boolean{
    if(this._loginServices.getAdminAuth()){
      return true;
    }
    this.router.navigate(['/login'])
    return false;
  }

}
