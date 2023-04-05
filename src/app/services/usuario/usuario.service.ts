import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RutasLogin } from '@environments/routes-production';
import { Observable } from 'rxjs';
import { IUsuario } from 'src/app/models/ilusuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  API_URL: string;

  constructor(private http: HttpClient) {
    this.API_URL = RutasLogin.url;
   }

  getUsuario(): Observable<IUsuario> {
    return this.http.get<IUsuario>(this.API_URL);
  }
}
