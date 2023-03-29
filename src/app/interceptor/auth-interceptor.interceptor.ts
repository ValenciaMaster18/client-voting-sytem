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

// Se define una constante que representa el token para indicar si se debe agregar un token JWT a la solicitud.
const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);

// Función para crear un nuevo objeto de contexto HTTP con la propiedad CHECK_TOKEN establecida en true.
export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true);
}

// Se marca la clase como un proveedor de servicio.
@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private _tokenService: TokenService
  ) { }

  // Método para interceptar cada solicitud HTTP y agregar un token JWT.
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // Si la propiedad CHECK_TOKEN está presente en el contexto HTTP de la solicitud, se agrega un token JWT.
    if (request.context.get(CHECK_TOKEN)) {
      return this.addTokenrequest(request, next);
    }

    // Si la propiedad CHECK_TOKEN no está presente en el contexto HTTP de la solicitud, se llama al siguiente interceptor HTTP en la cadena.
    return next.handle(request);
  }

  // Método para agregar un token JWT a la solicitud HTTP.
  private addTokenrequest(request: HttpRequest<unknown>, next: HttpHandler) {

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
