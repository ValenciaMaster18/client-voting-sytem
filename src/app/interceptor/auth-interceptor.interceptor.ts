import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../module/login/services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private _tokenService: TokenService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // primero comenzamos recuperando la cadena JWT de Local Storage directamente
    const idToken = this._tokenService.getToken();
    // verificar si el JWT está presente
    if (idToken) {
      // si el JWT está presente, clonaremos los encabezados HTTP y agregaremos un extra Authorization encabezado, que contendrá el JWT
      const cloned = request.clone({
        headers: request.headers.set("Authorization",
          "Bearer " + idToken)
      });

      return next.handle(cloned);
    }
    // si el JWT no está presente, la solicitud pasa al servidor sin modificaciones
    else {
      return next.handle(request);
    }
  }
}
