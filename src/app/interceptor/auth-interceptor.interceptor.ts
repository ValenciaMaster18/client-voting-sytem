import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken,
  HttpContext
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../module/login/services/token/token.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private _tokenService: TokenService
  ) { }

  // Método para interceptar cada solicitud HTTP y agregar un token JWT.
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // Se obtiene el token JWT del servicio TokenService.
    const idToken = this._tokenService.getToken();
    // Si el token JWT está presente, se clona la solicitud original y se agrega un encabezado "Authorization" con el token JWT.
    if (idToken) {
      const cloned = request.clone({
        headers: request.headers.set("Authorization",
          "Bearer " + idToken)
      });

      // Se llama al siguiente interceptor HTTP en la cadena con la solicitud clonada que contiene el token JWT.
      return next.handle(cloned);
    }

    // Si el token JWT no está presente, se llama al siguiente interceptor HTTP en la cadena con la solicitud original sin modificaciones.
    else {
      return next.handle(request);
    }
  }
}
