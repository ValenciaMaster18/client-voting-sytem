import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IAprendiz } from '../models/iaprendiz';
import { Observable } from 'rxjs';
import { RutasGetAprendiz, RutasPostAprendiz, RutasGetAprendizLocal } from '../environments/rutas-dev';
@Injectable({
  providedIn: 'root'
})
export class GetAprendizService {

  constructor(
    private http: HttpClient,
  ) {
    // ../../../../assets/json/data.json
  }

  getAprendiz(): Observable<IAprendiz[]>{
    return this.http.get<IAprendiz[]>(RutasGetAprendiz.url);
  }
  enviarAprendiz(nuevoAprendiz: IAprendiz){
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers: header };
    console.log(nuevoAprendiz)
    return this.http.post(RutasPostAprendiz.url, nuevoAprendiz, options);
  }

}
