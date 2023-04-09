import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from 'src/app/module/login/services/token/token.service';
import jwt_decode from 'jwt-decode';
import { IUsuario } from 'src/app/models/ilusuario';
import { VotosService } from 'src/app/services/votos/votos.service';
import { Observable } from 'rxjs';
/**
 * Los guards se implementan para ser inyectandos por lo tanto tenemos que usar la etiqueta @Inyectable, como si fueran Servicios en Angular.

Los guards devuelven true o false para permitir el paso o no de un usuario a la ruta. También pueden devolver un Observale o una Promise si el guard no puede responser inmediatamente y tiene que esperar.
 */
@Injectable(
  {
    providedIn: 'root'
  }
)
export class LoginGuardUser implements CanActivate {
  constructor(
    private router: Router,
    private _votosService: VotosService,
    private _tokenService: TokenService
  ) {

  }
  async canActivate(): Promise<boolean> {
    const token = this._tokenService.getToken() ?? null;
    if (token) {
      const tokenPayload: IUsuario = jwt_decode(token!);
      if (token && tokenPayload.role == "ROLE_APRENDIZ") {
        const pasar = await new Promise<boolean>((resolve, reject) => {
          this._votosService.getEstadoVotoAprendiz(tokenPayload.sub!).subscribe({
            next: (value: any | boolean) => {
              this._votosService.mensaje = "Acceso denegado. Votacion cerrada o ya votastes"
              resolve(!value);
            },
            error: (err: any) => {
              this._votosService.mensaje = "Acceso denegado. Votacion cerrada o ya votastes"
              resolve(false);
            },
            complete: () => { }
          });
        });
        if (!pasar) {
          this._votosService.estado = true;
          this._tokenService.removeToken()
          setTimeout(() => {
            this._votosService.estado = false;
          }, 7000)
        }
        return pasar;
      }
    }
    this.router.navigate(['']);
    return false;
  }

}
